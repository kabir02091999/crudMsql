import { useState , useEffect } from 'react'
import './App.css'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const [cliente, setcliente] = useState({
    nombre: '',
    apellido: '',
    edad: 0,
    pais: '',
    cargo: '',
    anio: 0 
  })

  const [clientes, setclientes] = useState([])
  const [buttonClicked, setButtonClicked] = useState(false)
  const [Formulario, setFormulario] = useState(true)

  const add = async () => {
    try {
      const response = await axios.post('http://localhost:3000/create', cliente)
      console.log(response.data)
    } catch (error) {
      console.error(error)
    }

    buttonClicked ? setButtonClicked(false) : setButtonClicked(true)

  }

  const Actualizar = (dato) => {
    setcliente(dato)
    console.log(cliente.nombre + ' actualizando ' +cliente.id)
    axios.put(`http://localhost:3000/update/${cliente.id}`, cliente)
    buttonClicked ? setButtonClicked(false) : setButtonClicked(true)
    setFormulario(true)
    setcliente({Nombre: '', apellido: '', edad: 0, pais: '', cargo: '', anio: 0})
    
  }

  const get = async () => {
    try {
      const response = await axios.get('http://localhost:3000/clientes')
      console.log(response.data)
      setclientes(response.data)
    } catch (error) {
      console.error(error)
    }
  }
 
  const handleChange = (e) => {
    const { name, value } = e.target
    setcliente((predata) => ({
      ...predata,
      [name]: value
    }));
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('enviando datos...')
    console.log(cliente)
    Formulario ? add() : Actualizar(cliente) 
    
  }

  useEffect(() => {
    get()
    return () => {console.log(cliente)}
  },[buttonClicked])
 

  return (
    <div className='container'>
      
      <div className='main'>
      <div className="card text-center">
        <div className="card-header">
          Registro
        </div>
        <div className="card-body">
          
        <div className='datos1'>
         
        <form className='datos2' onSubmit={handleSubmit}>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Nombre</span>
            <input type="text" className="form-control" name='Nombre' value={cliente.Nombre}  onChange={handleChange} placeholder='Nombre'/>
          </div>
          
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Apellido</span>
            <input type="text" className="form-control" name='apellido' value={cliente.apellido} onChange={handleChange} placeholder='Apellido'/>
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">edad</span>
            <input type="text" className="form-control"  name='edad'  value={cliente.edad} onChange={handleChange} placeholder='Edad'/>
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Pais</span>
            <input type="text" className="form-control" name='pais' value={cliente.pais} onChange={handleChange} placeholder='Pais'/>
          </div>      

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Cargo</span>
            <input type="text" className="form-control" name='cargo' value={cliente.cargo} onChange={handleChange} placeholder='Cargo'/>
          </div> 

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Años</span>
            <input type="text" className="form-control" name='anio' value={cliente.anio} onChange={handleChange} placeholder='años' />
          </div>   
          <button className='btn btn-success' type="submit" > {Formulario ?  <a>registrar</a> : <a>Actualuzar</a> }  </button>
        </form>
       
        
        </div>

        </div>
        <div className="card-footer text-body-secondary">
          2 days ago
        </div>
      </div>
        <div className='datos'>
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Nombre</th>
                <th scope="col">Apellido</th>
                <th scope="col">Edad</th>
                <th scope="col">Pais</th>   

                <th scope="col">Cargo</th>
                <th scope="col">Años</th>
                <th scope="col">Acción</th>
              </tr>
            </thead>
            <tbody>
              {clientes.map((cliente1, index) => (
                <tr key={index}>
                  <td>{cliente1.Nombre}</td>
                  <td>{cliente1.apellido}</td>
                  <td>{cliente1.edad}</td>
                  <td>{cliente1.pais}</td>
                  <td>{cliente1.cargo}</td>
                  <td>{cliente1.anio}</td>
                  <td>
                    <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                      <button
                        type="button" className="btn btn-danger"
                        onClick={() => {
                  
                          console.log(cliente1.id +" hola")
                          axios.delete(`http://localhost:3000/delete/${cliente1.id}`)
                          buttonClicked ? setButtonClicked(false) : setButtonClicked(true)
                        
                        }} // Pass ID to delete function
                      >
                        Borrar
                      </button>
                      <button type="button" className="btn btn-warning" onClick={() =>{ setFormulario(false); setcliente(cliente1) }}  >Actualizar</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
      
    </div>
  )

}

export default App
