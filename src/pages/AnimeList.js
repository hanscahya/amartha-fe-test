import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Axios from "axios";
import Button from '@mui/material/Button';

const columns = [
  {
    field: 'title',
    headerName: 'Title',
    width: 200,
  },
  {
    field: 'duration',
    headerName: 'Duration',
    width: 100,
  },
  {
    field: 'rating',
    headerName: 'Rating',
    width: 100,
  },
];

export default function AnimeList() {
  const [lists, setLists] = useState([]);
  const getList = () => {
    try {
      Axios.get('https://api.jikan.moe/v4/anime').then((response) => {
        if (response.status !== 200) throw Error
        let remapped = [...response.data.data]
        remapped.map(r => r.mal_id = r.id = r.mal_id)
        setLists([...response.data.data])
      })
    } catch (error) {
      console.log(error)
    }
  };
  useEffect(() => {
    getList()
  }, [])

  if (lists.length === 0) {
    return null;
  }

  return (
    <div style={{ height: 650, width: '100%' }}>
      <Button variant="text" onClick={getList}>Refetch</Button>
      <DataGrid
        rows={lists}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10, 20, 50]}
        checkboxSelection
      />
    </div>
  );
}
