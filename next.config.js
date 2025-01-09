module.exports = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "https://www.luciovilla.com/",
        permanent: true,
      },
    ];
  },
};
