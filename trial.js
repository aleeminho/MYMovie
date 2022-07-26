const data = {
  genres: [
    {
      "id": 12,
      "name": "Adventure"
    },
    {
      "id": 14,
      "name": "Fantasy"
    }
  ],
}

const arr = data.genres.map(e => e.name)

console.log(data.genres.map(e => e.name))