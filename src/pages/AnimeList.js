import React, { useState, useEffect } from 'react';
import Axios from "axios";
import { DataGrid } from '@mui/x-data-grid';
import ReactJson from 'react-json-view'

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

export default function AnimeList() {
  // Table handler
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
  const [search, setSearch] = useState('');
  const [lists, setLists] = useState([]);
  const getList = () => {
    try {
      const params = {
        q: search
      }
      Axios.get('https://api.jikan.moe/v4/anime', { params }).then((response) => {
        if (response.status !== 200) throw Error
        let remapped = [...response.data.data]
        remapped.map(r => r.mal_id = r.id = r.mal_id)
        setLists([...response.data.data])
      })
    } catch (error) {
      console.log(error)
    }
  };
  const onRowClick = (props) => {
    console.log(props.row)
    setDetail(props.row)
    handleOpen()
  }
  // END Table handler

  // Detail handler
  const [detail, setDetail] = useState({});
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setDetail({});
  };
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    height: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    overflowY: 'scroll',
  };
  // END Detail handler

  // Render
  useEffect(() => {
    getList()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div style={{ height: 650, width: '100%' }}>
      <TextField id="outlined-basic" label="Search" variant="outlined" size="small" value={search} onChange={(e) => setSearch(e.target.value)} />
      <Button variant="text" onClick={getList}>Search</Button>

      <DataGrid
        rows={lists}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10, 20, 50]}
        onRowClick={onRowClick}
      />

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {detail && detail.title} Details
          </Typography>
          <ReactJson src={detail} />
        </Box>
      </Modal>
    </div>
  );
  // On Render
}
