import { useEffect, useState } from 'react';
import { ContentHeader } from '@components';
import axios from 'axios';
import MasjidModal from './MasjidModal'; // We’ll create this next

const Blank = () => {
  const [masjids, setMasjids] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editMasjid, setEditMasjid] = useState(null);

  const fetchMasjids = async () => {
    const res = await axios.get('http://localhost:5000/api/masjids');
    setMasjids(res.data);
  };

  useEffect(() => {
    fetchMasjids();
  }, []);

  const handleEdit = (masjid) => {
    setEditMasjid(masjid);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/masjids/${id}`);
    fetchMasjids();
  };

  return (
    <div>
      <ContentHeader title="Masjid Management" />
      <section className="content">
        <div className="container-fluid">
          <button className="btn btn-primary mb-3" onClick={() => setShowModal(true)}>
            Add Masjid
          </button>

          <div className="card">
            <div className="card-body table-responsive p-0">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Country</th>
                    <th>City</th>
                    <th>Longitude</th>
                    <th>Latitude</th>
                    <th>Area</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {masjids.map((m) => (
                    <tr key={m._id}>
                      <td>{m.name}</td>
                      <td>{m.country}</td>
                      <td>{m.city}</td>
                      <td>{m.longitude}</td>
                      <td>{m.latitude}</td>
                      <td>{m.area}</td>
                      <td>
                        <button className="btn btn-sm btn-warning mr-2" onClick={() => handleEdit(m)}>
                          Edit
                        </button>
                        <button className="btn btn-sm btn-danger" onClick={() => handleDelete(m._id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                  {masjids.length === 0 && (
                    <tr>
                      <td colSpan={7} className="text-center">No masjids found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {showModal && (
        <MasjidModal
          onClose={() => {
            setShowModal(false);
            setEditMasjid(null);
            fetchMasjids();
          }}
          editMasjid={editMasjid}
        />
      )}
    </div>
  );
};

export default Blank;
