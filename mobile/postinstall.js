const fs = require("fs");
(() => {
  const filePath = require.resolve(
    "react-native-reanimated/lib/module/Animated.js"
  );
  const code = fs.readFileSync(filePath).toString();
  fs.writeFileSync(
    filePath,
    code.replace(`export { Easing,`, `export { Easing as EasingNode, Easing,`)
  );
})();
