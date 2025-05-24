import axios from "axios";

const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YTBmZTliNzhjM2NiMmFjNmJjYzNkMzM5ZTA2MjhmZCIsIm5iZiI6MTc0NTkwNjkzMy4zMDQsInN1YiI6IjY4MTA2Y2Y1MmU4YmEwMjJlNDgwZDc4ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.krXhJ_exxE1EiMdLOlX5NALyi6sm-MXmvfCEeud88WM'
      }
})



export default instance;

