import React from 'react';
import { FiTrash2, FiEdit } from 'react-icons/fi';
import Alert from './Alert';
import Loading from './Loading';
import Modal from './Modal';
import Pagination from './Pagination';
import Table from './Table';
import Widget from './Widget';
import Address from './Address';
import SelectOptions from './SelectOptions';

const UI = {
  update: {
    button: {
      label: 'Edit',
      icon: <FiEdit />,
      color: 'warning',
    },
    modalButtons: {
      primary: { text: 'Update', type: 'submit', color: 'success' },
      secondary: { text: 'Cancel', type: 'button', color: 'danger' },
    },
  },
  delete: {
    button: {
      label: 'Delete',
      icon: <FiTrash2 />,
      color: 'danger',
    },
    modalButtons: {
      primary: { text: 'Yes', type: 'submit', color: 'success' },
      secondary: { text: 'No', type: 'button', color: 'danger' },
    },
  },
};

export {
  UI,
  Alert,
  Loading,
  Modal,
  Pagination,
  Table,
  Widget,
  Address,
  SelectOptions,
};
