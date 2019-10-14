# React-native App no formato para mobile

### Download the latest version
```
$ sudo npm install -g react-native-cli
```

### Fazer o download do [Android SDK](https://developer.android.com/studio/#downloadshttps://developer.android.com/studio/#downloads) Configurar o ambiente para o desenvolvimento android
```
$ export ANDROID_HOME=/home/abner/Android/Sdk
```
```
$ export PATH=$PATH:$ANDROID_HOME/tools
```
```
$ export PATH=$PATH:$ANDROID_HOME/platform-tools
```

### Instalando as ferramentas

```
$ /home/abner/Android/Sdk/tools/bin/sdkmanager "platform-tools" "platforms;android-27" "build-tools;27.0.3"
```

### Habilitando a depuração usb no sistema android
```
$ lsusb
```
```
$ echo 'SUBSYSTEM=="usb", ATTR{idVendor}=="<your_phone_id>", MODE="0666", GROUP="plugdev"' | sudo tee /etc/udev/rules.d/51-android-usb.rules
```
```
$ adb devices
```

### Gerar o arquivo para debug
```
$ keytool -genkey -v -keystore debug.keystore -storepass android -alias androiddebugkey -keypass android -keyalg RSA -keysize 2048 -validity 10000
```

### Baixar as dependências
```
$ yarn install
```

### Adiocione o controle de navegação
```
$ yarn add react-navigation react-native-gesture-handler react-native-reanimated
```

### Adicionando o controle da comunicação com a API
```
$ yarn add axios
```
```
$ sudo react-native axios
```

### Melhorando o ASYNC e AWAIT
```
$ yarn add @react-native-community/async-storage
```
```
$ react-native link @react-native-community/async-storage
```

### Baixando a versão do android
```
$ sudo npm install @react-native-community/cli-platform-android@2.7.0 <android_version>
```

### Execução na plataforma android
```
$ sudo yarn react-native run-android
```

### Contruindo o APK

Criar o arquivo para chaves com o debug, e executar este comando na pasta do projeto gradle android no app em react
```
$ ./gradlew assembleRelease
```

### No caso de erros para construir o APK (JS server carregando infinitamente)
```
$ sudo npm i jetifier
```
```
$ sudo npx jetify
```
