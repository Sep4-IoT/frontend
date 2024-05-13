module.exports = {
    transform: {
      '\\.[jt]sx?$': 'babel-jest'
    },
    moduleNameMapper: {
      '\\.(css|less|sass|scss)$': 'identity-obj-proxy'
    }
  };
  