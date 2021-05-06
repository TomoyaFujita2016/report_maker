module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  pluginOptions: {
   electronBuilder: {
     builderOptions: {
       productName: "ReportMaker",
       mac: {
         icon: 'build/icon.png',
       },
     }
   }
  }
}
