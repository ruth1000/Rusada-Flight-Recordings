import { useEffect, useState } from "react";
import $ from 'jquery';
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import axios from "axios";
import moment from 'moment';

function App() {

  var data = [
 {/*   {
      'id': 1,
      'sighting_make': 'Item 1',
      'sighting_modal': 200,
      'sighting_location': 'Test Description 1',
      'sighting_date': '2021-12-16T13:39',
      'sighting_image': 'https://picsum.photos/200/300'
    },
    {
      'id': 2,
      'sighting_make': 'Item 2',
      'sighting_modal': 300,
      'sighting_location': 'Test Description 2',
      'sighting_date': '2021-12-16T13:39',
      'sighting_image': 'https://picsum.photos/200/300'
    },
    {
      'id': 3,
      'sighting_make': 'Item 3',
      'sighting_modal': 400,
      'sighting_location': 'Test Description 3',
      'sighting_date': '2021-12-16T13:39',
      'sighting_image': 'https://picsum.photos/200/300'
    },
    {
      'id': 4,
      'sighting_make': 'Item 4',
      'sighting_modal': 500,
      'sighting_location': 'Test Description 4',
      'sighting_date': '2021-12-16T13:39',
      'sighting_image': 'https://picsum.photos/200/300'
    },
    {
      'id': 5,
      'sighting_make': 'Item 5',
      'sighting_modal': 600,
      'sighting_location': 'Test Description 5',
      'sighting_date': '2021-12-16T13:39',
      'sighting_image': 'https://picsum.photos/200/300'
    } */}
  ] 



  const [sightings] = useState(data);
  const [sighting_make, setMake] = useState("");
  const [sighting_make_err,setsightingMakeerr] = useState(false);
  const [sighting_image, setSightingImage] = useState("");
  const [sighting_modal, setModal] = useState("");
  const [sighting_modale_err,setsightingmodalerr] = useState(false);
  const [sighting_date, setSightDate] = useState("");
  const [sighting_date_err,setsightingdateerr] = useState("");
  const [sighting_location, setLocationn] = useState("");
  const [sighting_location_err,setsightinglocationerr] = useState(false);
  const [siReg_Sx, setRegSx] = useState("");
  const [siReg_Sx_err,setsiReg_Sxerr] = useState(false);
  const [siReg_Px, setRegPx] = useState("");
  const [siReg_Px_err,setsiReg_Pxerr] = useState(false);
  const [sighting_id, setSightingId] = useState("");
  const [allSightings, setAllSightings] = useState([]);

  useEffect(() => {
   
getallSightings();
   
  }, [])

  const editsighting = (sightings) => {
    setMake(sightings.make);
    setModal(sightings.model);
    setRegPx(sightings?.registration?.split('-')[0] || '');
    setRegSx(sightings?.registration?.split('-')[1] || '');
    setLocationn(sightings.location);
    setSightingId(sightings.id);
    setSightingImage(sightings.aircraftPhoto)
    setSightDate(sightings.dateAndTime)
  }
  

  const viewSighting = (sightings) => {
    setMake(sightings.make);
    setModal(sightings.model);
    setRegPx(sightings?.registration?.split('-')[0] || '');
    setRegSx(sightings?.registration?.split('-')[1] || '');
    setLocationn(sightings.location);
    setSightingId(sightings.id);
    setSightingImage(sightings.aircraftPhoto)
    setSightDate(sightings.dateAndTime)
  }

  const isFormValidate = ()=>{
    
   
    setsightingMakeerr(false);
    if(!sighting_make){
      setsightingMakeerr(true);
      return false;
    }
    setsightingmodalerr(false)
    if(!sighting_modal || sighting_modal < 1){
      setsightingmodalerr(true);
      return false;
    }
    setsiReg_Pxerr(false);
    if(siReg_Px.length > 2 || siReg_Px.length < 1){
      setsiReg_Pxerr(true);
      return false;
    }
    setsiReg_Sxerr(false);
    if(siReg_Sx.length > 5 || siReg_Sx.length < 1){
      setsiReg_Sxerr(true);
      return false;
    }
    setsightinglocationerr(false)
    if(!sighting_location){
      setsightinglocationerr(true);
      return false;
    }
    setsightingdateerr(false)
    if(!sighting_date){
      setsightingdateerr('sighting date is required');
      return false;
    }
    if(new Date(sighting_date) > new Date() ){
      setsightingdateerr('Sighting date and time must be less than the current time');
      return false;
    }
  
    return true;
  }

  //  Creating an Sighting
  const createSighting = () => {
    const isFormValidated = isFormValidate();
    if(!isFormValidated)
      return;
    axios.post('https://localhost:44343/api/FlightSights', {
      /* column name : input value */
      "id":"0",
      "make": sighting_make.toString(),
      "registration":`${siReg_Px}-${siReg_Sx}`,
      "model": sighting_modal,
      "location": sighting_location,
      "dateAndTime": sighting_date,
      "aircraftPhoto": sighting_image
    })
      .then((response) => {
        if(response.status === 201){
          getallSightings();
          window.location.reload();
        }
      })
      .catch((error) => {
        console.log(error);
      })
  }

  //  Retriving All Sightings
  const getallSightings = () => {

    axios.get('https://localhost:44343/api/FlightSights')
    .then((response) => {
      setAllSightings(response.data);
      $('#myTable').DataTable();
    })
    .catch((error) => {
      console.log(error);
    })
    
  }


  //  Updating an Sighting
  const updateSighting = () => {
    const isFormValidated = isFormValidate();
    if(!isFormValidated)
      return;
    axios.put('https://localhost:44343/api/FlightSights/' + sighting_id,{
      "id":sighting_id,
      "make": sighting_make.toString(),
      "registration":`${siReg_Px}-${siReg_Sx}`,
      "model": sighting_modal,
      "location": sighting_location,
      "dateAndtime": sighting_date,
      "aircraftPhoto": sighting_image
    })
      .then((response) => {
        if(response.status === 200){
          getallSightings();
          window.location.reload();
        }
      })
      .catch((error) => {
        console.log(error);
        window.confirm('Are You Sure You Want to Delete this Sighting ?');
      })
  }

  //  Deleting an Sighting
  const deleteSighting = (id) => {

    var confirm = window.confirm('Are You Sure You Want to Delete this Sighting ?');

    if (confirm) {

      axios.delete('https://localhost:44343/api/FlightSights/' + id)
        .then((response) => {
          if(response.status === 200){
            getallSightings();
          }
        })
        .catch((error) => {
          console.log(error);
        })
    }
  }
  
  const getBase64ImageData=(event)=>{
    if(event.target.files && event.target.files[0]){
      console.log("addSightingFormPopulate",event.target.files)
      let reader = new FileReader();
      reader.readAsBinaryString(event.target.files[0]);
      reader.onload = (e) => {
        setSightingImage("data:image/jpeg;base64," + btoa(e.target.result))
        //setSightingImage(btoa(e.target.result))
      }
    }
  }
  return (

    <div className="App">
      <div className="mt-5">
        <h4 className="text-center mt-5">Sighting Management</h4>
        <div className="row mt-5">
          <div className="container">
            <div className="row">
              <div className="col-md-2"></div>
              <div className="col-md-8">
                <button data-bs-toggle="modal" data-bs-target="#addsightingModal" className="btn btn-success mb-4" >Add New Sighting</button>
                <table id="myTable" className="table table-striped nowrap">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Make</th>
                      <th scope="col">Modal</th>
                      <th scope="col">Registration</th>
                      <th scope="col">Location</th>                      
                      <th scope="col">Image</th>
                      <th scope="col">Date / Time</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allSightings.map((sighting, key) => {
                      return (
                        <tr key={key}>
                          <td>{key + 1}</td>
                          <td>{sighting.make}</td>
                          <td>{sighting.model}</td>
                          <td>{sighting.registration}</td>
                          <td>{sighting.location}</td>
                          <td><img src={sighting.aircraftPhoto} width={20} height={20} /></td>
                          <td>{moment(sighting.dateAndTime).format("M/DD/YYYY HH:mm:ss A")}</td>
                          <td><i style={{ cursor: "pointer" }} data-bs-toggle="modal" data-bs-target="#viewSightingModal" onClick={() => {
                            viewSighting(sighting)
                          }} className="fas fa-search text-secondary"></i>&nbsp;&nbsp;&nbsp;<i style={{ cursor: "pointer" }} data-bs-toggle="modal" data-bs-target="#editsightingModal" onClick={() => {
                            editsighting(sighting)
                          }} className="fas fa-edit text-info"></i>&nbsp;&nbsp;&nbsp;
                            <i style={{ cursor: "pointer" }} onClick={() => deleteSighting(sighting.id)} className="fas fa-trash text-danger"></i></td>
                        </tr>
                      )
                    })}
                  </tbody>
                  <tfoot>
                    <tr>
                    <th scope="col">#</th>
                      <th scope="col">Make</th>
                      <th scope="col">Modal</th>
                      <th scope="col">Registration</th>
                      <th scope="col">Location</th>                      
                      <th scope="col">Image</th>
                      <th scope="col">Date / Time</th>
                      <th scope="col">Action</th>
                    </tr>
                  </tfoot>
                </table>
              </div>
              <div className="col-md-2"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Add sighting */}

      <div className="modal fade" id="addsightingModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Add New Sighting</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form>
              <div className="modal-body">
            
                <div className="form-group">
                  <label className='m-2'>Make</label>
                  <input type="text" maxLength="128" className="form-control" onChange={(e)=>{setMake(e.target.value)}} id="sighting_make" name="sighting_make" aria-describedby="emailHelp" placeholder="Enter Make" required />
                  {sighting_make_err && <span style={{ color: "red" }}>{'Make cannot be empty'}</span>}
                </div>
                <div className="form-group">
                  <label className="m-2">Model</label>
                  <input type="text" maxLength="128" className="form-control" onChange={(e)=>{setModal(e.target.value)}} id="model" name="model" placeholder="Enter Model" required />
                  {sighting_modale_err && <span style={{ color: "red" }}>{'Model cannot be empty'}</span>}
                </div>
                 <div className="form-group">
                <label className='m-2'>Registration</label>
                <div style={{display:'flex'}}>          
                <input style={{width:'40%',marginRight:'5%'}} maxLength="2" type="text" onChange={(e)=>{setRegPx(e.target.value)}} className="form-control" id="siReg_Px" name="siReg_Px"  aria-describedby="emailHelp"  placeholder="Registration" required />
                <input style={{width:'55%'}} type="text" maxLength="5" className="form-control" onChange={(e)=>{setRegSx(e.target.value)}} id="siReg_Sx" name="siReg_Sx"  aria-describedby="emailHelp"  placeholder="Registration"  required/>
                </div>
                {siReg_Px_err && <span style={{ color: "red",fontSize:'13px' }}>{'Please Complete the Registration'}</span>}
                {siReg_Sx_err && <span style={{ color: "red",marginLeft:'210px',fontSize:'13px' }}>{'Please Complete the Registration'}</span>}
              </div>
                
                <div className="form-group">
                  <label className="m-2">Location</label>
                  <textarea type="text" maxLength="255" className="form-control" onChange={(e)=>{setLocationn(e.target.value)}} id="sighting_location" placeholder="Enter Location" required />
                  {sighting_location_err && <span style={{ color: "red" }}>{'Location cannot be empty'}</span>}
                </div>
                <div className="form-group">
                  <label className="m-2">Item Image</label>
                  <input type="file" accept="image/png, image/gif, image/jpeg" onChange={(e)=>{getBase64ImageData(e)}} className="form-control" id="sighting_image" name="sighting_image" />
                </div>
                <div className="form-group">
                  <label className="m-2">Date / Time</label>
                  <input type="datetime-local" className="form-control" onChange={(e)=>{setSightDate(e.target.value)}} id="date_time" name="date_time" required  />
                  {sighting_date_err && <span style={{ color: "red" }}>{`${sighting_date_err}`}</span>}
                </div>
              </div>
              <div className="modal-footer border-top-0 d-flex">
                <button type="button" onClick={createSighting} className="btn btn-success">Save Sighting</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Edit Item Modal */}
      <div className="modal fade" id="editsightingModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Item</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form>
              <div className="modal-body">
               
                <div className="form-group">
                  <label className='m-2'>Make</label>
                  <input type="text" maxLength={128} className="form-control" id="make" onChange={(e)=>{setMake(e.target.value)}} name="make" value={sighting_make} aria-describedby="make" placeholder="Enter Make" required />
                  {sighting_make_err && <span style={{ color: "red" }}>{'Make cannot be empty'}</span>}
                </div>
                <div className="form-group">
                  <label className="m-2">Model</label>
                  <input type="text" maxLength={128} className="form-control" id="model" onChange={(e)=>{setModal(e.target.value)}} name="model" value={sighting_modal} placeholder="Enter Model" required />
                  {sighting_modale_err && <span style={{ color: "red" }}>{'Model cannot be empty'}</span>}
                </div>
                <div className="form-group">
                  <label className='m-2'>Registration</label>
                  <div style={{display:'flex'}}>
                  <input style={{width:'40%',marginRight:'5%'}} maxLength="2" type="text" onChange={(e)=>{setRegPx(e.target.value)}} className="form-control" id="siReg_Px" name="siReg_Px" value={siReg_Px} aria-describedby="emailHelp" placeholder="Registration" required />
                  <input style={{width:'55%'}} type="text" maxLength="5" className="form-control" onChange={(e)=>{setRegSx(e.target.value)}} id="siReg_Sx" name="siReg_Sx" value={siReg_Sx} aria-describedby="emailHelp" placeholder="Registration" required />
                 
                </div>
                {siReg_Px_err && <span style={{ color: "red",fontSize:'13px' }}>{'Please Complete the Registration'}</span>}
                {siReg_Sx_err && <span style={{ color: "red",marginLeft:'210px',fontSize:'13px' }}>{'Please Complete the Registration'}</span>}
                </div>
                <div className="form-group">
                  <label className="m-2">Location</label>
                  <textarea type="text" maxLength={255} className="form-control" id="unit_description" onChange={(e)=>{setLocationn(e.target.value)}} value={sighting_location} placeholder="Enter Location" required />
                  {sighting_location_err && <span style={{ color: "red" }}>{'Location cannot be empty'}</span>}
                </div>
                <div className="form-group">
                  <label className="m-2">Created Date / Time</label>
                  <input type="datetime-local" Value={sighting_date} className="form-control" onChange={(e)=>{setSightDate(e.target.value)}}  id="date_time" name="date_time" required />
                  {sighting_date_err && <span style={{ color: "red" }}>{`${sighting_date_err}`}</span>}
                </div>
                <div className="form-group">
                  <label className="m-2">Item Image</label>
                  <input type="file" accept="image/png, image/gif, image/jpeg" onChange={(e)=>{getBase64ImageData(e)}} className="form-control" id="item_image" name="item_image" />
                </div>
              </div>
              <div className="modal-footer border-top-0 d-flex">
                <button type="button" onClick={updateSighting} className="btn btn-primary">Update Sighting</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* View sighting Modal */}
      <div className="modal fade" id="viewSightingModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">View Sighting</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
             
              <div className="form-group"> 
                <label className='m-2'>Make</label>
                <input type="text" className="form-control" readOnly id="sighting_make" name="sighting_make" defaultValue={sighting_make} aria-describedby="" placeholder="Enter Make" />
              </div>
             
              <div className="form-group">
                <label className="m-2">Modal</label>
                <textarea type="text" className="form-control" readOnly id="sighting_location" defaultValue={sighting_modal} placeholder="Enter Modal" />
              </div>
              <div className="form-group">
                <label className='m-2'>Item PLU</label>
                <div style={{display:'flex'}}>
                <input style={{width:'40%',marginRight:'5%'}} readOnly type="text" className="form-control" id="siReg_Px" name="siReg_Px" defaultValue={siReg_Px} aria-describedby="emailHelp" placeholder="Enter Item Batch Number" />
                <input style={{width:'55%'}} readOnly type="text" className="form-control" id="siReg_Sx" name="siReg_Sx" defaultValue={siReg_Sx} aria-describedby="emailHelp" placeholder="Enter Item Number" />
                </div>
              </div>
              <div className="form-group">
                <label className="m-2">Location</label>
                <input type="text" className="form-control" readOnly id="model" name="model" defaultValue={sighting_location} placeholder="Enter Model" />
              </div>
              <div className="form-group">
                <label className="m-2">Sighting Date / Time</label>
                <input type="datetime-local" defaultValue={sighting_date} readOnly className="form-control" id="date_time" name="date_time" />
              </div>
              <div className="form-group mb-5">
                <label className="m-2">Image</label><br></br>
                <img className="img-fluid" src={sighting_image} />
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

// Custome Table and  Search without usingg datatables default search

// <input type="text" id="myInput" onkeyup="myFunction()" placeholder="Search for names.." title="Type in a name">

//{ <table id="myTable">


{/* function myFunction() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }       
  }
}
*/}



export default App;
