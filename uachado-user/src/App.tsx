import "./App.css";
import { Route, Routes } from "react-router-dom";
import NewItem from "./components/NewItem/newItem";
import Home from "./components/Home/home";
import DropPoints from "./components/DropPoints/droppoints";
import Navbar from "./components/Navbar/navbar";
import ItemList from "./components/ItemList/itemlist";
import Dashboard from "./components/Dashboard/dashboard";

const data = [

  {
      "image": "https://media.discordapp.net/attachments/852109272262770710/1166749106669113364/image.png",
      "description": "Carteira preta",
      "tag": "Carteiras",
      "dropoffPoint_id": "Cantina de Santiago"
  },
  {
      "image": "https://www.lenovo.com/medias/lenovo-laptop-yoga-slim-series-feature-2-1.png?context=bWFzdGVyfC9lbWVhL2ltYWdlcy98NjkxMzczfGltYWdlL3BuZ3wvZW1lYS9pbWFnZXMvaDgyL2gzZC8xNTg4MTY4MTk5Mzc1OC5wbmd8OWUxZWI4ZTBjZjRhYTNiN2E2YmZlODEyOTAzYjdmOTc4NTE0ZTdiM2IwMGQ0YzI3MzI0NjVkM2I0NTBmY2U5MA",
      "description": "Notebook ultrafino",
      "tag": "Portáteis",
      "dropoffPoint_id": "Reitoria"
  },
  {
      "image": "https://www.tek4life.pt/media/catalog/product/cache/2/image/800x800/85e4522595efc69f496374d01ef2bf13/s/2/s23__lavender_composta_1.png",
      "description": "Smartphone Samsung",
      "tag": "Telemóveis",
      "dropoffPoint_id": "Cantina de Santiago"
  },
  {
      "image": "https://img.pccomponentes.com/articles/1066/10663343/1111-lenovo-tab-m10-hd-2nd-gen-101-3-32gb-gris.jpg",
      "description": "Tablet Lenovo",
      "tag": "Tablets",
      "dropoffPoint_id": "Cantina do Crasto"
  },
  {
      "image": "https://nanochip.pt/wp-content/uploads/Produtos/JBLT520BTAZUL/headphone-jbl-tune-t520-5-3-le-bluetooth-azul-0.jpg",
      "description": "Auscultadores JBL",
      "tag": "Auscultadores/Fones",
      "dropoffPoint_id": "Cantina do Crasto"
  },
  {
      "image": "https://www.worten.pt/i/370d3f3ddc5f01b5fb58963e70730d74e5d61626.jpg",
      "description": "Carregador portátil universal",
      "tag": "Carregadores",
      "dropoffPoint_id": "CP"
  }

];

function App() {
  return (
    <div className="">
      <Navbar />
      <div className="flex items-center justify-center">
        <div tabIndex={0} className="card shadow-xl bg-primary mt-5 sm:m-10">
          <Contents />
        </div>
      </div>
    </div>
  );
}

function Contents() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dropPoints" element={<DropPoints/> } />
      <Route path="/findItems" element={<ItemList data={data}/>} />
      <Route path="/dashboard" element={<Dashboard/>} />
      <Route path="/newItem" element={<NewItem />} />
    </Routes>
  );
}

export default App;
