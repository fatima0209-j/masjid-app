import { useEffect, useState } from 'react';
import axios from 'axios';

const initialForm = {
  name: '',
  country: '',
  city: '',
  longitude: '',
  latitude: '',
  area: '',
};

const MasjidModal = ({ onClose, editMasjid }) => {
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (editMasjid) setForm(editMasjid);
  }, [editMasjid]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editMasjid) {
      await axios.put(`http://localhost:5000/api/masjids/${editMasjid._id}`, form);
    } else {
      await axios.post('http://localhost:5000/api/masjids', form);
    }
    onClose();
  };

  return (
    <div className="modal fade show d-block" tabIndex={-1} role="dialog" style={{ background: '#000000aa' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            <div className="modal-header">
              <h5 className="modal-title">{editMasjid ? 'Edit Masjid' : 'Add Masjid'}</h5>
              <button type="button" className="close" onClick={onClose}>
                <span>&times;</span>
              </button>
            </div>

            <div className="modal-body">
              {Object.keys(initialForm).map((key) => (
                <div className="form-group" key={key}>
                  <label>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
                  <input
                    type="text"
                    className="form-control"
                    value={form[key]}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    required
                  />
                </div>
              ))}
            </div>

            <div className="modal-footer">
              <button type="submit" className="btn btn-success">
                {editMasjid ? 'Update' : 'Add'}
              </button>
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MasjidModal;
