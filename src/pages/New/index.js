import React, { useState, useMemo } from "react";
import api from "../../services/api";

import camera from "../../assets/camera.svg";

import "./styles.css";

export default function New({ history }) {
  const [Company, setCompany] = useState("");
  const [Techs, setTechs] = useState("");
  const [Price, setPrice] = useState("");
  const [Thumbnail, setThumbnail] = useState(null);

  const preview = useMemo(() => {
    // se tiver algum valor na thumbnail ele cria uma url pra thumbnail atual
    // segundo parametro é a variavel que ele vai ficar observando
    return Thumbnail ? URL.createObjectURL(Thumbnail) : null;
  }, [Thumbnail]);

  async function handleSubmit(e) {
    e.preventDefault();

    // buscando usuario que ta logado
    const user_id = localStorage.getItem("user");
    console.log(user_id);

    // passando dados como multipart form data
    const data = new FormData();
    data.append("thumbnail", Thumbnail);
    data.append("company", Company);
    data.append("price", Price);
    data.append("techs", Techs);

    await api.post("/spots", data, {
      headers: { user_id }
    });

    history.push("/dashboard");
  }

  return (
    <form onSubmit={handleSubmit}>
      <label
        id="thumbnail"
        style={{ backgroundImage: `url(${preview})` }}
        // se tiver thumbnail ele vai adicionar a classe
        className={Thumbnail ? "has-thumbnail" : null}
      >
        <input type="file" onChange={e => setThumbnail(e.target.files[0])} />
        <img src={camera} alt="camera" />
      </label>

      <label htmlFor="company">EMPRESA *</label>
      <input
        id="company"
        placeholder="Sua empresa incrível"
        value={Company}
        onChange={e => setCompany(e.target.value)}
        type="text"
      />

      <label htmlFor="techs">
        TECNOLOGIAS * <span>(separadas por vírgula)</span>
      </label>
      <input
        id="techs"
        placeholder="Quais tecnologias usam?"
        value={Techs}
        onChange={e => setTechs(e.target.value)}
        type="text"
      />

      <label htmlFor="Price">
        VALOR DA DIÁRIA * <span>(deixa em branco se for GRATUITO)</span>
      </label>
      <input
        id="Price"
        placeholder="Valor cobrado?"
        value={Price}
        onChange={e => setPrice(e.target.value)}
        type="text"
      />

      <button type="submit" className="btn">
        Cadastrar
      </button>
    </form>
  );
}
