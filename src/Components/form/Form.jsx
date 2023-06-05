import { Alert, Button, Form, Modal } from 'react-bootstrap';
import './form.css'
import { useRef, useState } from 'react';
import { db } from './../../firebase'
import { doc, setDoc } from 'firebase/firestore';
import success from './../../images/success.png'

const FormUser = () => {

    const firstName = useRef()
    const lastName = useRef()
    const email = useRef()
    const phone = useRef()
    const date = useRef()

    const [activeAlert, setActiveAlert] = useState(false)
    const [activeModal, setActiveModal] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const phonePattern = /^\+?3?8?(0\d{9})$/g
        const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

        if(
            !firstName.current.value 
            || !lastName.current.value 
            || !email.current.value 
            || !phone.current.value 
            || !date.current.value 
            || !phonePattern.test(phone.current.value)
            || !emailPattern.test(email.current.value)
        ) {
            setActiveAlert(true)
            setTimeout(() => setActiveAlert(false), 3000)
        } else {
            const id = genToken()
            await setDoc(doc(db, "users", id), {
                firstName: firstName.current.value,
                lastName: lastName.current.value,
                email: email.current.value,
                phone: phone.current.value,
                birth: date.current.value,
                id: id,
            });
            setActiveModal(true)
            setTimeout(() => setActiveModal(false), 1500)
        }
    }

    const genToken = () => {
        var a = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split("");
        var b = [];  
        for (var i=0; i < 32; i++) {
            var j = (Math.random() * (a.length-1)).toFixed(0);
            b[i] = a[j];
        }
        return b.join("");
    }


    return ( 
        <div className='form__page'>
            <div className='wrapper'>
                <Form>

                    <Form.Group className="mb-3">
                        <Form.Label className="form__label">First Name</Form.Label>
                        <Form.Control ref={firstName} placeholder='Vanek' />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label className="form__label">Last Name</Form.Label>
                        <Form.Control ref={lastName} placeholder='Slomal' />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label className="form__label">Email</Form.Label>
                        <Form.Control ref={email} placeholder='vanekslomal@gmail.com' type='email' />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label className="form__label">Phone number</Form.Label>
                        <Form.Control ref={phone} placeholder='+380-00-000-00-00' type='tel' />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label className="form__label">Birth</Form.Label>
                        <Form.Control ref={date} type='date'/>
                    </Form.Group>

                    <Button variant="primary" type="submit" onClick={handleSubmit}>
                        Submit
                    </Button>
                    
                </Form>
            </div>
            <Alert className={activeAlert ? 'form__alertBlock visible' : 'form__alertBlock'} variant='danger'>
                Enter your data
                <button type="button" className="close" aria-label="Close" onClick={() => setActiveAlert(false)}>
                    <span aria-hidden="true">&times;</span>
                </button>
            </Alert>
            <Modal show={activeModal} onHide={() => setActiveModal(false)}>
                <Modal.Header>
                    <button type="button" className="close" aria-label="Close" onClick={() => setActiveModal(false)}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </Modal.Header>
                <Modal.Body>
                    <Modal.Title>
                        You successfuly added a user
                    </Modal.Title>
                    <img src={success} alt="" />
                </Modal.Body>
        </Modal>
        </div>
    );
}

export default FormUser;