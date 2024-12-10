import Input from "./Input";

import Select from './select';

import "./create.scss"
import { statusOptions, typeOptions } from './../../utils/constants';
import api from './../../utils/api';
import { useDispatch } from 'react-redux';
import { createJob } from "../../redux/slices/jobSlice";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

const Create = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    // form gönderince
    const handleSubmit = (e) => {
        e.preventDefault();

        // inputtan verileri al
        const formData = new FormData(e.target);
        const jobData = Object.fromEntries(formData.entries());

        // Tarih ekle
        jobData.date = Date.now();

        // apiistegi at
        api
            .post("/jobs", jobData)
            .then((res) => {
                dispatch(createJob(res.data))
                toast.success("Başvuru Oluşturuldu");
                navigate("/")
            })

            .catch((err) => {
                console.log(err);
                toast.error("Başvuru oluşturma başarısız");
            })
    }
    return (
        <div className="add-page">
            <section className="container">
                <h2>Yeni İş Ekle</h2>

                <form onSubmit={handleSubmit}>
                    <Input label="Pozisyon" name="position" />
                    <Input label="Şirket" name="company" />
                    <Input label="Lokasyon" name="location" />
                    <Select label="Durum" name="status" options={statusOptions} />
                    <Select label="Tür" name="type" options={typeOptions} />

                    <div className="btn-wrapper">
                        <button className="button">Oluştur</button>
                    </div>

                </form>


            </section>
        </div>
    );
};

export default Create;
