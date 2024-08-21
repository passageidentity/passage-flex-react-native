import { PassageFlex } from 'passage-flex-react-native';
import { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';

const passageFlex = new PassageFlex('eIGvJLBjM9qIWhJcmjQeJdEq');

const AuthScreen = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async () => {
    const transactionId = 'B22UUkRKudNm2nsYEQj3GNyU';
    const nonce = await passageFlex.passkey.register(transactionId);
    console.log(nonce);
    setMessage(nonce);
  };

  const handleLogin = async () => {
    const transactionId = 'y5sbRFr2rBVKEkKwEXlA3qqh';
    const nonce = await passageFlex.passkey.authenticate(transactionId);
    console.log(nonce);
    setMessage(nonce);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Button title="Register" onPress={handleRegister} />
      <Button title="Log In" onPress={handleLogin} />
      {message ? <Text style={styles.message}>{message}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  message: {
    marginTop: 20,
    fontSize: 16,
    color: 'green',
  },
});

export default AuthScreen;
