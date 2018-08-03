// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential', 
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    // allow async-await
    "comma-spacing": 0,//逗号前后的空格
    "space-before-blocks": [0, "always"],//不以新行开始的块{前面要不要有空格
    "key-spacing": [0, { "beforeColon": false, "afterColon": true }],//对象字面量中冒号的前后空格
    'generator-star-spacing': 'off',
    "no-multiple-empty-lines": [1, {"max": 2}],//空行最多不能超过2行
    // allow debugger during development
    "no-trailing-spaces": 0,//一行结束后面不要有空格
    "arrow-spacing": 0,//=>的前/后括号
    "indent":0,
    "padded-blocks": 0,//块语句内行首行尾是否要空行 
    "space-before-function-paren": [0, "always"],//函数定义时括号前面要不要有空格
    "semi-spacing": [0, {"before": false, "after": true}],//分号前后空格 
    "space-infix-ops": 0,//中缀操作符周围要不要有空格  
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  }
}
