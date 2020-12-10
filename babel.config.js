module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    ['import', {
      libraryName: 'vant',
      libraryDirectory: 'es',
      style: (Button, NavBar, Icon) => `${Button, NavBar,Icon}/style/less`,
    }, 'vant']
  ]
}