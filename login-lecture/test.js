function add(a, b) {
  return a + b;
}

function result_ko(result) {
  return "결과 = " + result;
}

function result_en(result) {
  return "result = " + result;
}

function print(a, b, callback) {
  var val = add(a, b);
  var result = callback(val);
  console.log(result);
}

print(1, 1, result_ko);
print(1, 1, result_en);
