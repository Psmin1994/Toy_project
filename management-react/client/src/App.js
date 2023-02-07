import './App.css';
import Customer from './components/Customer';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { makeStyles } from '@mui/styles';

const styles = makeStyles({
  root: {
    width: '100%',
    border: '1px solid blue',
    overflowX: 'auto',
  },
  table: {
    minWidth: 1080,
  },
});


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
];

// JSX 문법
const App = () => {
  const classes = styles();
  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>번호</TableCell>
            <TableCell>이미지</TableCell>
            <TableCell>이름</TableCell>
            <TableCell>생년월일</TableCell>
            <TableCell>성별</TableCell>
            <TableCell>직업</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {customers.map((element) => {
            return (
              <Customer
                key={element.id}
                id={element.id}
                img={element.img}
                name={element.name}
                birthday={element.birthday}
                gender={element.gender}
                job={element.job}
              />
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default App;
