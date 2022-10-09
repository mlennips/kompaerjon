import path from "path/posix";

module.exports = {
    resolve: {
      extensions: ['js', 'ts'],
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@assets': path.resolve(__dirname, 'src/assets'),
        '@components': path.resolve(__dirname, 'src/components'),
        '@views': path.resolve(__dirname, 'src/views'),
      },
    },
  }