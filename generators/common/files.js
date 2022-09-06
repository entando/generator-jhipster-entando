const commonFiles = {
  global: [
    {
      templates: [
        {
          file: 'gitignore',
          renameTo: () => '.gitignore',
        },
      ],
    },
  ],
  entando: [
    {
      templates: [
        'entando.json',
        {
          file: 'platform/gitkeep',
          renameTo: () => 'platform/.gitkeep',
          method: 'copy',
          noEjs: true,
        },
      ],
    },
  ],
};

function writeFiles() {
  return {
    writeEntandoFiles() {
      this.writeFilesToDisk(commonFiles, this, false, null);
    },
  };
}

module.exports = {
  writeFiles,
};
