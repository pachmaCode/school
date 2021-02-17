import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from "@angular/router"
import { CorporativoService } from "./services/corporativo.service"
import { Corporativo } from "./models/corporativo.model"
import { Contacto } from "./models/contacto.model"
import { NgxSpinnerService } from "ngx-spinner";
import { DatatableComponent, ColumnMode } from "@swimlane/ngx-datatable";
import { ContactoRequest } from './models/contactonuevo.model';
import { DatePipe } from '@angular/common';
import swal from 'sweetalert2';

@Component({
  selector: 'app-page',
  templateUrl: './corporativo.component.html',
  styleUrls: ['./corporativo.component.scss', '/assets/sass/pages/page-users.scss', '/assets/sass/libs/select.scss'],
  encapsulation: ViewEncapsulation.None,
  providers:[DatePipe]

})
export class CorporativoComponent implements OnInit {

  public corporativo:any
  habiltar=true
  nombreBotonContacto="Crear Contacto"
  nombreBoton="Editar"
  selectedLanguages = ["English"];
  languages = [
      { value: "English", name: 'English' },
      { value: "Spanish", name: 'Spanish'},
      { value: "French", name: 'French' },
      { value: "Russian", name: 'Russian' },
      { value: "German", name: 'German'},
      { value: "Hindi", name: 'Hindi' },
      { value: "Arabic", name: 'Arabic' },
      { value: "Sanskrit", name: 'Sanskrit'},
  ];

  selectedMusic = ["Jazz", "Hip Hop"];
  music = [
      { value: "Rock", name: 'Rock' },
      { value: "Jazz", name: 'Jazz'},
      { value: "Disco", name: 'Disco' },
      { value: "Pop", name: 'Pop' },
      { value: "Techno", name: 'Techno'},
      { value: "Folk", name: 'Folk' },
      { value: "Hip Hop", name: 'Hip Hop' },
  ];

  selectedMovies = ["The Dark Knight", "Perl Harbour"];
  movies = [
      { value: "Avatar", name: 'Avatar' },
      { value: "The Dark Knight", name: 'The Dark Knight'},
      { value: "Harry Potter", name: 'Harry Potter' },
      { value: "Iron Man", name: 'Iron Man' },
      { value: "Spider Man", name: 'Spider Man'},
      { value: "Perl Harbour", name: 'Perl Harbour' },
      { value: "Airplane!", name: 'Airplane!' },
  ];

  constructor(private rutaActiva: ActivatedRoute,
              private corporativoService: CorporativoService,
              private datePipe: DatePipe,
              private spinner: NgxSpinnerService,
              private fb: FormBuilder) { }


  public actualizarForm: FormGroup;
  actualizarContactos: FormGroup;
  public foto:any;
  public nombre:any

  @ViewChild(DatatableComponent) table: DatatableComponent;

  // row data
  public rows = [];
  public ColumnMode = ColumnMode;
  public limitRef = 10;
  // column header
  public columns = [
    { name: "nombre", prop: "nombre" },
    { name: "puesto", prop: "puesto" },
    { name: "telefono", prop: "telefono" },
    { name: "celular", prop: "celular" },
    { name: "email", prop: "email" },
    { name: "observaciones", prop: "observaciones" },
    { name: "Actions", prop: "Actions" },
  ];
    // private
    private tempData = [];
    editar=false
    // Public Methods
    // -----------------------------------------------------------------------------------------------------
  
    /**
     * filterUpdate
     *
     * @param event
     */
    filterUpdate(event) {
      const val = event.target.value.toLowerCase();
  
      // filter our data
      const temp = this.tempData.filter(function (d) {
        return d.Username.toLowerCase().indexOf(val) !== -1 || !val;
      });
  
      // update the rows
      this.rows = temp;
      // Whenever the filter changes, always go back to the first page
      this.table.offset = 0;
    }
  
    /**
     * updateLimit
     *
     * @param limit
     */
    updateLimit(limit) {
      this.limitRef = limit.target.value;
    }


  ngOnInit(): void {
    this.actualizarContactos= this.fb.group({
      nombreContacto:['',Validators.required],
      puesto:['',Validators.required],
      comentarios:['',Validators.required],
      telefono:['',Validators.required],
      celular:['',Validators.required],
      email:['',Validators.required],
    });

    this.actualizarForm = this.fb.group({
      nombreCompleto:['',Validators.required],
      nombreCorto:['',Validators.required],
      estatus:['',Validators.required],
      url:['',Validators.required],
      fecha:['',Validators.required]
    });
    let id= this.rutaActiva.snapshot.params.id
    this.actualizarInformacionCorpo(id);
    
  }
  actualizar:boolean
  idContacto=""
  cargarDatos(row:any){
    this.actualizarContactos.get('nombreContacto').setValue(row.nombre);
    this.actualizarContactos.get('puesto').setValue(row.puesto);
    this.actualizarContactos.get('comentarios').setValue(row.observaciones);
    this.actualizarContactos.get('telefono').setValue(row.telefono);
    this.actualizarContactos.get('celular').setValue(row.celular);
    this.actualizarContactos.get('email').setValue(row.email);
    this.actualizar=true;
    this.nombreBotonContacto="Actualizar Contacto"
    this.idContacto=row.id
  }

  crearContacto(){
    console.log("actualizando Contacto ...")
    let contactoRequest = new ContactoRequest;
    contactoRequest.S_Nombre=this.actualizarContactos.get('nombreContacto').value
    contactoRequest.S_Puesto=this.actualizarContactos.get('puesto').value
    contactoRequest.S_Comentarios=this.actualizarContactos.get('comentarios').value
    contactoRequest.N_TelefonoFijo=this.actualizarContactos.get('telefono').value
    contactoRequest.N_TelefonoMovil=this.actualizarContactos.get('celular').value
    contactoRequest.S_Email=this.actualizarContactos.get('email').value
    contactoRequest.tw_corporativo_id=this.corporativo.id
    this.spinner.show();

    if(this.actualizar){
      this.corporativoService.actualizarContacto(contactoRequest, this.idContacto).subscribe(success => {
        this.actualizar=false;
        this.actualizarInformacionCorpo(this.corporativo.id)
        this.actualizarContactos.get('nombreContacto').setValue('');
        this.actualizarContactos.get('puesto').setValue('');
        this.actualizarContactos.get('comentarios').setValue('');
        this.actualizarContactos.get('telefono').setValue('');
        this.actualizarContactos.get('celular').setValue('');
        this.actualizarContactos.get('email').setValue('');
        this.nombreBotonContacto="Crear Contacto"

        swal.fire({
          icon: 'success',
          title: 'Contactos',
          text: 'Contacto Actualizado con exito',
          showConfirmButton: false,
          timer: 3000,
          customClass: {
            confirmButton: 'btn btn-primary'
          },
          buttonsStyling: false,
        });
        setTimeout(() => {
          this.spinner.hide();
        }, 3000);
      },
      (error) =>{
        console.log(error)
        setTimeout(() => {
          this.spinner.hide();
        }, 3000);
      });
    }else{
      this.corporativoService.crearContacto(contactoRequest).subscribe(success => {

        this.actualizar=false;
        this.idContacto=""
        this.actualizarInformacionCorpo(this.corporativo.id)
        this.filterUpdate
        swal.fire({
          icon: 'success',
          title: 'Contactos',
          text: 'Contacto Creado con exito',
          showConfirmButton: false,
          timer: 3000,
          customClass: {
            confirmButton: 'btn btn-primary'
          },
          buttonsStyling: false,
        });
        setTimeout(() => {
          this.spinner.hide();
        }, 3000);
      },
      (error) =>{
        console.log(error)
        setTimeout(() => {
          this.spinner.hide();
        }, 3000);
      });
    }
  }


  eliminarContacto(row) {
    this.spinner.show();
    this.corporativoService.eliminarContacto(row.id).subscribe(success => {
      swal.fire({
        icon: 'success',
        title: 'Contactos',
        text: 'Contacto Eliminado con exito',
        showConfirmButton: false,
        timer: 3000,
        customClass: {
          confirmButton: 'btn btn-primary'
        },
        buttonsStyling: false,
      });
      setTimeout(() => {
        this.spinner.hide();
      }, 3000);
      this.actualizarInformacionCorpo(this.corporativo.id)

    },
    (error) =>{
      console.log(error)
      setTimeout(() => {
        this.spinner.hide();
      }, 3000);
    });
  }

  actualizarCorporativo() {
    if(this.editar==false){
      this.nombreBoton="Guardar Corporativo"
      this.actualizarForm.enable()
      this.editar=true
    }else {
      this.nombreBoton="Editar"
      this.editar=false;
      this.spinner.show();
      console.log("actualizando Corporativo ...")
      let corporativoRequest = new Corporativo;
      corporativoRequest.id=this.corporativo.id
      corporativoRequest.S_NombreCompleto=this.actualizarForm.get("nombreCompleto").value
      corporativoRequest.S_NombreCorto=this.actualizarForm.get("nombreCorto").value
      corporativoRequest.FK_Asignado_id=this.corporativo.FK_Asignado_id
      corporativoRequest.S_Activo=this.actualizarForm.get("estatus").value
      corporativoRequest.S_LogoURL=this.actualizarForm.get("url").value
      corporativoRequest.D_FechaIncorporacion=this.actualizarForm.get("fecha").value
      this.corporativoService.actualizarCorporativo(corporativoRequest).subscribe(success => {        

        this.actualizarInformacionCorpo(this.corporativo.id)
        swal.fire({
          icon: 'success',
          title: 'Corporativos',
          text: 'Corporativo Actualizado con exito',
          showConfirmButton: false,
          timer: 3000,
          customClass: {
            confirmButton: 'btn btn-primary'
          },
          buttonsStyling: false,
        });
        setTimeout(() => {
          this.spinner.hide();
        }, 3000);
      },
      (error) =>{
        console.log(error)
        setTimeout(() => {
          this.spinner.hide();
        }, 3000);
      });
    }
    

  }
  
  actualizarInformacionCorpo(id){
    this.rows=[];
    this.tempData=[];
    this.spinner.show();

    this.corporativoService.obtenerCorporativoDetalle(id).subscribe(success => {
      this.corporativo=success.data.corporativo;
      this.actualizarForm.get('nombreCompleto').setValue(this.corporativo.S_NombreCompleto);
      this.actualizarForm.get('nombreCorto').setValue(this.corporativo.S_NombreCorto);
      this.actualizarForm.get('estatus').setValue(this.corporativo.S_Activo);
      this.actualizarForm.get('url').setValue(this.corporativo.S_LogoURL);
      this.actualizarForm.get('fecha').setValue(this.datePipe.transform(new Date(this.corporativo.D_FechaIncorporacion),'yyyy-MM-dd'));
      this.actualizarForm.disable()

      for(let contacto of this.corporativo.tw_contactos_corporativo){
        let contactoModel= new Contacto
        contactoModel.id=contacto.id
        contactoModel.nombre=contacto.S_Nombre
        contactoModel.puesto=contacto.S_Puesto
        contactoModel.telefono=contacto.N_TelefonoFijo;
        contactoModel.celular=contacto.N_TelefonoMovil
        contactoModel.email=contacto.S_Email
        contactoModel.observaciones=contacto.S_Comentarios
        contactoModel.idCorporativo=contacto.tw_corporativo_id
        this.tempData.push(contactoModel);
      }
      this.rows=this.tempData
      setTimeout(() => {
        this.spinner.hide();
      }, 2000);
          },
    (error) =>{
      console.log(error)
      setTimeout(() => {
        this.spinner.hide();
      }, 2000);
    });
  }
  

}
