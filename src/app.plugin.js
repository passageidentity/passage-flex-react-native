const {
  withDangerousMod,
  withPlugins,
  withAndroidManifest,
  withEntitlementsPlist,
} = require('@expo/config-plugins');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Helper to modify Podfile for iOS
function addPodfileDependency(contents) {
  const podDependency = `pod 'PassageFlex', '0.2.0'`;

  if (!contents.includes(podDependency)) {
    const targetIndex = contents.lastIndexOf(`target '`);
    if (targetIndex !== -1) {
      const nextLineIndex = contents.indexOf('\n', targetIndex);
      contents =
        contents.slice(0, nextLineIndex) +
        `  ${podDependency}\n` +
        contents.slice(nextLineIndex);
    }
  }

  return contents;
}

// iOS: Add PassageFlex CocoaPod
function withIosPodfile(configuration) {
  return withDangerousMod(configuration, [
    'ios',
    (config) => {
      const podfilePath = path.join(
        config.modRequest.platformProjectRoot,
        'Podfile'
      );
      let podfileContents = fs.readFileSync(podfilePath, 'utf-8');

      podfileContents = addPodfileDependency(podfileContents);

      fs.writeFileSync(podfilePath, podfileContents);

      return config;
    },
  ]);
}

// iOS: Add Associated Domains Capability
function withIosAssociatedDomain(configuration) {
  const associatedDomain = process.env.ASSOCIATED_DOMAIN;
  if (!associatedDomain) {
    throw new Error('ASSOCIATED_DOMAIN environment variable is not set');
  }
  return withEntitlementsPlist(configuration, (config) => {
    config.modResults['com.apple.developer.associated-domains'] = [
      `webcredentials:${associatedDomain}`,
    ];
    return config;
  });
}

// Android: Add PassageFlex Gradle Dependency
function withAndroidGradleDependency(configuration) {
  return withDangerousMod(configuration, [
    'android',
    (config) => {
      const buildGradlePath = path.join(
        config.modRequest.platformProjectRoot,
        'app',
        'build.gradle'
      );
      let buildGradleContents = fs.readFileSync(buildGradlePath, 'utf-8');

      const passageDependency = `implementation 'id.passage.android:passageflex:0.2.0'`;

      if (!buildGradleContents.includes(passageDependency)) {
        const dependenciesIndex = buildGradleContents.indexOf('dependencies {');
        if (dependenciesIndex !== -1) {
          const nextLineIndex = buildGradleContents.indexOf(
            '\n',
            dependenciesIndex
          );
          buildGradleContents =
            buildGradleContents.slice(0, nextLineIndex + 1) +
            `    ${passageDependency}\n` +
            buildGradleContents.slice(nextLineIndex + 1);
        }
      }

      fs.writeFileSync(buildGradlePath, buildGradleContents);

      return config;
    },
  ]);
}

// Android: Modify AndroidManifest.xml for asset_statements
function withAndroidAssociatedDomain(configuration) {
  const associatedDomain = process.env.ASSOCIATED_DOMAIN;
  if (!associatedDomain) {
    throw new Error('ASSOCIATED_DOMAIN environment variable is not set');
  }

  // Modify AndroidManifest.xml
  configuration = withAndroidManifest(configuration, async (config) => {
    const application = config.modResults.manifest.application[0];

    if (!application.hasOwnProperty('meta-data')) {
      application['meta-data'] = [];
    }

    const metaDataExists = application['meta-data'].some(
      (metaData) => metaData.$['android:name'] === 'asset_statements'
    );

    if (!metaDataExists) {
      application['meta-data'].push({
        $: {
          'android:name': 'asset_statements',
          'android:resource': '@string/asset_statements',
        },
      });
    }

    return config;
  });

  // Modify strings.xml
  configuration = withDangerousMod(configuration, [
    'android',
    (config) => {
      const stringsXmlPath = path.join(
        config.modRequest.platformProjectRoot,
        'app/src/main/res/values/strings.xml'
      );

      if (!fs.existsSync(stringsXmlPath)) {
        throw new Error(`strings.xml not found at ${stringsXmlPath}`);
      }

      let stringsXmlContent = fs.readFileSync(stringsXmlPath, 'utf-8');

      // Check if the string already exists
      if (!stringsXmlContent.includes('<string name="passage_auth_origin">')) {
        // Add the new strings to strings.xml
        const newStrings = `<string name="passage_auth_origin">${associatedDomain}</string>
        <string name="asset_statements">[{"include": "https://@string/passage_auth_origin/.well-known/assetlinks.json"}]</string>`;

        // Insert the new strings before the closing </resources> tag
        stringsXmlContent = stringsXmlContent.replace(
          '</resources>',
          `${newStrings}\n</resources>`
        );

        // Write the updated contents back to strings.xml
        fs.writeFileSync(stringsXmlPath, stringsXmlContent);
      }

      return config;
    },
  ]);

  return configuration;
}

module.exports = withAndroidAssociatedDomain;

// Combine all plugins into a single config plugin
const withPassage = (configuration) => {
  return withPlugins(configuration, [
    // withIosPodfile,
    // withIosAssociatedDomain,
    withAndroidGradleDependency,
    withAndroidAssociatedDomain,
  ]);
};

export default withPassage;
