import React, { useState } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { toast } from 'react-hot-toast';

function AdminMenu() {
  const [menuItems, setMenuItems] = useState([
    {
      id: '1',
      name: 'Paneer Butter Masala',
      description: 'Cottage cheese cubes cooked in a creamy tomato gravy',
      price: 199,
      image: 'https://images.unsplash.com/photo-1627921268740-b6a70f27e524?auto=format&fit=crop&q=80',
      category: 'Main Course'
    },
    {
      id: '2',
      name: 'Vegetable Biryani',
      description: 'Fragrant basmati rice cooked with mixed vegetables and spices',
      price: 179,
      image: 'https://images.unsplash.com/photo-1600891963935-c9e8b58d97ab?auto=format&fit=crop&q=80',
      category: 'Main Course'
    },
    {
      id: '3',
      name: 'Masala Dosa',
      description: 'Crispy rice crepe stuffed with spiced potato filling, served with chutneys',
      price: 99,
      image: 'https://images.unsplash.com/photo-1586015552223-673c54f36f09?auto=format&fit=crop&q=80',
      category: 'Main Course'
    },
    {
      id: '4',
      name: 'Masala Chai',
      description: 'Traditional Indian tea brewed with aromatic spices',
      price: 30,
      image: 'https://images.unsplash.com/photo-1586201375761-83865001e07b?auto=format&fit=crop&q=80',
      category: 'Beverages'
    },
    {
      id: '5',
      name: 'Lassi',
      description: 'Refreshing yogurt-based drink with a hint of cardamom',
      price: 60,
      image: 'https://images.unsplash.com/photo-1588459469605-0e4263f41a5e?auto=format&fit=crop&q=80',
      category: 'Beverages'
    },
    {
      id: '6',
      name: 'Pani Puri',
      description: 'Crispy puris filled with tangy tamarind water and spiced potatoes',
      price: 50,
      image: 'https://images.unsplash.com/photo-1577979749835-1e06c5cb3c44?auto=format&fit=crop&q=80',
      category: 'Chaat and Snacks'
    },
    {
      id: '7',
      name: 'Samosa',
      description: 'Crispy pastry filled with spiced potato and peas',
      price: 20,
      image: 'https://images.unsplash.com/photo-1604653875444-d5a5bb4a55c6?auto=format&fit=crop&q=80',
      category: 'Chaat and Snacks'
    },
    {
      id: '8',
      name: 'Aloo Tikki',
      description: 'Fried potato patties served with mint and tamarind chutney',
      price: 35,
      image: 'https://images.unsplash.com/photo-1578459799418-3d316d32b3b5?auto=format&fit=crop&q=80',
      category: 'Chaat and Snacks'
    }
  ]);

  const [editingItem, setEditingItem] = useState(null);

  const handleEdit = (item) => {
    setEditingItem(item);
  };

  const handleDelete = (id) => {
    setMenuItems(items => items.filter(item => item.id !== id));
    toast.success('Item deleted successfully');
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (editingItem) {
      setMenuItems(items =>
        items.map(item =>
          item.id === editingItem.id ? editingItem : item
        )
      );
      setEditingItem(null);
      toast.success('Item updated successfully');
    }
  };

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="display-4 fw-bold mb-0">Menu Management</h1>
        <button className="btn btn-primary">
          <Plus size={20} className="me-2" />
          Add New Item
        </button>
      </div>

      <div className="row g-4">
        {menuItems.map(item => (
          <div key={item.id} className="col-md-6 col-lg-4">
            <div className="card border-0 shadow-sm h-100">
              <img 
                src={item.image} 
                className="card-img-top" 
                alt={item.name}
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <h3 className="h5 mb-0">{item.name}</h3>
                  <span className="badge bg-primary">${item.price.toFixed(2)}</span>
                </div>
                <p className="text-muted small mb-3">{item.description}</p>
                <div className="d-flex gap-2">
                  <button 
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => handleEdit(item)}
                  >
                    <Edit2 size={16} className="me-1" />
                    Edit
                  </button>
                  <button 
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => handleDelete(item.id)}
                  >
                    <Trash2 size={16} className="me-1" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {editingItem && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Menu Item</h5>
                <button 
                  type="button" 
                  className="btn-close"
                  onClick={() => setEditingItem(null)}
                ></button>
              </div>
              <form onSubmit={handleSave}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={editingItem.name}
                      onChange={e => setEditingItem({
                        ...editingItem,
                        name: e.target.value
                      })}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                      className="form-control"
                      value={editingItem.description}
                      onChange={e => setEditingItem({
                        ...editingItem,
                        description: e.target.value
                      })}
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Price</label>
                    <input
                      type="number"
                      step="0.01"
                      className="form-control"
                      value={editingItem.price}
                      onChange={e => setEditingItem({
                        ...editingItem,
                        price: parseFloat(e.target.value)
                      })}
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button 
                    type="button" 
                    className="btn btn-secondary"
                    onClick={() => setEditingItem(null)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminMenu;
