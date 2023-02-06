import './App.css';
import Customer from './components/Customer';

// https://placeimg.com/64/64/any 임의 이미지
var customers = [
  {
    id: 1,
    img: 'https://placeimg.com/120/120/1',
    name: '홍길동',
    birthday: '940716',
    gender: '남자',
    job: '대학생',
  },
  {
    id: 2,
    img: 'https://placeimg.com/120/120/2',
    name: '박찬희',
    birthday: '001126',
    gender: '남자',
    job: '야구선수',
  },
  {
    id: 3,
    img: 'https://placeimg.com/120/120/3',
    name: '박상민',
    birthday: '940716',
    gender: '남자',
    job: '프로그래머',
  },
  {
    id: 1,
  },
];

// JSX 문법
const App = () => {
  return (
    <div>
      {customers.map((element) => {
        return (
          <Customer
            key={element.id} id={element.id} img={element.img} name={element.name} birthday={element.birthday}
            gender={element.gender} job={element.job}
          />
        );
      })}
    </div>
  );
};

export default App;
