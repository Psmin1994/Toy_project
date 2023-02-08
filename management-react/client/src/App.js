import './App.css';
import Customer from './components/Customer';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import CircularProgress from '@mui/material/CircularProgress';
import {makeStyles} from '@mui/styles';
import {useEffect, useState} from 'react';

const styles = makeStyles({
  root: {
    width: '100%',
    border: '1px solid blue',
    overflowX: 'auto',
  },
  table: {
    minWidth: 1080,
  },
  progress: {
    margin: '16px',
  },
});

// JSX 문법
const App = () => {
  const [data, setData] = useState([]);
  const [progress, setProgress] = useState(0);

  const progressFunc = () => {
    setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
  };

  useEffect(() => {
    const timer = setInterval(progressFunc, 200);
    fetch('/api/customers')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setData(data);
      });

    return () => {
      clearInterval(timer);
    };
  }, []);

  const classes = styles();
  return (
    <>
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
            {data.length ? (
              data.map((element) => {
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
              })
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <CircularProgress className={classes.progress} variant="determinate" value={progress} />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Paper>
    </>
  );
};

export default App;
