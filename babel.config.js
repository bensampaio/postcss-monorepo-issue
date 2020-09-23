module.exports = {
    presets: [
        ['@babel/preset-env', {
            corejs: 3,
            targets: ['node 12'],
            useBuiltIns: 'usage',
        }],
        '@babel/preset-react',
    ],
};
