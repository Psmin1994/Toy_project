function solution(progresses, speeds) {
  var answer = [];

  let arr = progresses.map((x, i) => Math.ceil((100 - x) / speeds[i]));

  let index = 0;

  while (index < arr.length) {
    let day = arr[index];

    let j = arr.findIndex((x) => x > day);

    if (j == -1) {
      answer.push(arr.length - index);
      break;
    } else {
      answer.push(j - index);
      index = j;
    }
  }

  return answer;
}
