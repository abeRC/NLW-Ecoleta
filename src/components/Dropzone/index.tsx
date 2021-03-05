import React, {useCallback, useState} from 'react';
import {useDropzone} from 'react-dropzone';


import { FiUpload } from "react-icons/fi";
import "./styles.css";

interface Props {
  onFileUploaded: (file: File) => void;
}

const Dropzone: React.FC<Props> = ({ onFileUploaded }) => {
  /*Recebemos os atributos (i.e., props) do componente aqui dentro! 
    O onFileUploaded vem da desestruturação.*/
  const [selectedFileUrl, setSelectedFileUrl] = useState("");

  const onDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0];

    const fileurl = URL.createObjectURL(file);

    setSelectedFileUrl(fileurl);
    onFileUploaded(file);
  }, [onFileUploaded]); /*Colocar o método na lista de coisas pra vigiar não é obrigatório.*/

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*"
  })

  return (
    <div className="dropzone" {...getRootProps()}>
      <input {...getInputProps()} accept="image/*" />
      {/*Aqui o accep=image/*é algo mais visual (arquivos inválidos ficarem cinza, etc.); 
        quem manda é o useDropzone.
        E o input tem uma tag multiple se algum dia isso parecer interessante.*/}

        { selectedFileUrl 
          ? <img src={selectedFileUrl} alt="Point thumbnail" />
          : (
            <p>
            <FiUpload />
            Imagem do estabelecimento
          </p>
          )
        }
          
    </div>
  )
}


export default Dropzone;