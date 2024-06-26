import React, { useState, useEffect } from 'react';
import Navbar from '../../components/navbar/Navbar';
import SidePanel from '../../components/sidePanel/SidePanel';
import './ProfileSummary.css';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';
import { format } from 'date-fns';


const ProfileSummary = () => {
    const { user, loading, error, dispatch } = useAuth();
    const [person, setPerson] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editingField, setEditingField] = useState(null);

    // Fetch user data on component mount
    useEffect(() => {
        const fetchUserData = async () => {
            if (user) {
                try {
                    const res = await axios.get(`/users/${user._id}`);
                    setPerson(res.data);
                } catch (err) {
                    console.error('Error fetching user data:', err);
                }
            }
        };

        fetchUserData();
    }, [user]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (!user || !person) return <div>No user data available</div>;

    const id = user._id;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPerson({
            ...person,
            [name]: value
        });
    }

    const handleSaveClick = async () => {
        setIsEditing(false);
        setEditingField(null);
        try {
            const res = await axios.put(`/users/${id}`, person);
            setPerson(res.data);
        } catch (err) {
            console.error('Error updating user:', err);
        }
    }

    const handleCancelClick = () => {
        setPerson(user);
        setIsEditing(false);
        setEditingField(null);
    }

    const handleEditClick = (field) => {
        setIsEditing(true);
        setEditingField(field);
    }


    // Inside your ProfileSummary component

    const renderField = (field, type = "text", options = null, display) => {

        return (
            <li className='list-group-item d-flex justify-content-between align-items-center'>
                <span>{display}</span>
                <div className='flex-fill d-flex align-items-center'>
                    {isEditing && editingField === field ? (
                        type === "select" ? (
                            <select
                                className="form-control mx-2"
                                name={field}
                                value={person[field]}
                                onChange={handleChange}
                            >
                                {options.map(option => (
                                    <option key={option} value={option}>{option.charAt(0).toUpperCase() + option.slice(1)}</option>
                                ))}
                            </select>
                        ) : (
                            <input
                                type={type}
                                className="form-control mx-2"
                                name={field}
                                value={person[field]}

                                onChange={handleChange}
                            />
                        )
                    ) : (
                        // <h5>{person[field] ? person[field] : `Enter Your ${display}`}</h5>
                        <h5>
                            {field === 'dateOfBirth' && person[field]
                                ? format(new Date(person[field]), 'yyyy-MM-dd')
                                : person[field] ? person[field] : `Enter Your ${display}`}
                        </h5>

                    )}
                    {isEditing && editingField === field ? (
                        <>
                            <button className="btn btn-outline-secondary mx-1" onClick={handleSaveClick}>Save</button>
                            <button className="btn btn-outline-secondary mx-1" onClick={handleCancelClick}>Cancel</button>
                        </>
                    ) : (
                        <button
                            className="btn btn-outline-secondary mx-1"
                            onClick={() => handleEditClick(field)}
                            disabled={isEditing}
                        >
                            Edit
                        </button>
                    )}
                </div>
            </li>
        );
    };

    return (
        <div>
            <Navbar />
            <SidePanel />
            <div className='profile-summary'>
                <h2>Personal Information</h2>
                <ul className="list-group list-group-flush">
                    {renderField('name', 'text', null, 'Name')}
                    {renderField('email', 'email', null, 'Email')}
                    {renderField('phoneNumber', 'tel', null, 'Phone Number')}
                    {renderField('dateOfBirth', 'date', null, 'Date of Birth')}
                    {renderField('gender', 'select', ['', 'male', 'female', 'other'], 'Gender')}
                    {renderField('address', 'text', null, 'Address')}
                    {renderField('country', 'text', null, 'Country')}
                    {renderField('nationality', 'text', null, 'Nationality')}
                </ul>
            </div>
        </div>
    );
};

export default ProfileSummary;
