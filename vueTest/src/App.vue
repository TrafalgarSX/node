<!-- <script setup lang="ts"> -->
<script setup >
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'
import * as etCommonCrypto from './etcommon/gmCrypto'
import * as opensslCrypto from './wasm/etcommon.js'

function testCrypto() {
    etCommonCrypto.smCryptoTest();
    alert('gmCryptoTest');
}

function testOpenSSL() {
    opensslCrypto.test();
    alert('opensslCryptoTest');
}

</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />
      <button @click="testCrypto">Test</button>
      <button @click="testOpenSSL">OpenSSL WASM Test</button>
    </div>
  </header>

  <main>
    <TheWelcome />
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
