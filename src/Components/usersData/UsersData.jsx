import { db } from './../../firebase'
import { getDocs, collection, deleteDoc, doc } from 'firebase/firestore';
import { useState } from 'react';
import { Table } from 'react-bootstrap';

const UsersData = () => {

    const [users, setUsers] = useState([])

    const findData = async () => {
        const usersArr = []
        const querySnapshot = await getDocs(collection(db, "users"));
        querySnapshot.forEach((doc) => {
            usersArr.push(doc.data())
        });
        setUsers(usersArr)
    }

    findData()

    const deleteUser = async (userId) => {
        await deleteDoc(doc(db, "users", userId));
    }

    return ( 
        <div style={{marginTop: '50px'}}>
            <Table striped bordered hover style={{marginTop: '30px'}}>
                <thead> 
                    <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Birth</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(u => {
                        return (
                            <tr key={users.indexOf(u) + 1}>
                                <td>{users.indexOf(u) + 1}</td>
                                <td>{u?.firstName}</td>
                                <td>{u?.lastName}</td>
                                <td>{u?.email}</td>
                                <td>{u?.phone}</td>
                                <td>
                                    {u?.birth}
                                    <button type="button" className="close" aria-label="Close" onClick={() => deleteUser(u?.id)}>
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
            
        </div>
    );
}

export default UsersData;