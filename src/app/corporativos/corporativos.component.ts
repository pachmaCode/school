import { Component, ViewEncapsulation ,ViewChild, OnInit} from '@angular/core';
import { DatatableComponent, ColumnMode } from "@swimlane/ngx-datatable";
import { usersListData } from "./data/users-list.data";
import { CorporativosService } from "./services/corporativos.services"
import { Corporativos } from "./models/corporativos.model"
import { NgxSpinnerService } from "ngx-spinner";
import { FormBuilder, FormGroup} from '@angular/forms';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-corpo',
  templateUrl: './corporativos.component.html',
  styleUrls: ['./corporativos.component.scss'],
  encapsulation: ViewEncapsulation.None,

})

export class CorporativoListComponent implements OnInit{
  @ViewChild(DatatableComponent) table: DatatableComponent;

  // row data
  public rows = [];
  public ColumnMode = ColumnMode;
  public limitRef = 10;
  // column header
  public columns = [
    { name: "Nombre", prop: "Nombre" },
    { name: "Url", prop: "url" },
    { name: "Fecha Incorporacion", prop: "fechaIncorporacion" },
    { name: "Fecha Creacion", prop: "fechaCreacion" },
    { name: "Usuario Creacion", prop: "UsuarioCreacion" },
    { name: "Usuario Asignado", prop: "UsuarioAsignado" },
    { name: "Status", prop: "Status" },
    { name: "Actions", prop: "Actions" },
  ];

  // private
  private tempData = [];
  public corpoInicialForm: FormGroup;

  constructor(private corporativosService: CorporativosService,
    private spinner: NgxSpinnerService,
    private fb: FormBuilder
    ) {
    console.log(usersListData)
 
  }

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
    this.corpoInicialForm = this.fb.group({
      verified:[''],
      role:[''],
      status:['']
    });

    
      this.spinner.show();
    this.corporativosService.obtenerCorporativos().subscribe(success => {
      for(let corpo of success.data){
        console.log(corpo)
        let rows= new Corporativos
        rows.id=corpo.id
        rows.nombreCorto=corpo.S_NombreCorto
        rows.nombre=corpo.S_NombreCompleto
        rows.foto=corpo.S_LogoURL
        rows.url=environment.apiURL+corpo.S_SystemUrl;
        rows.fechaIncorporacion=corpo.D_FechaIncorporacion
        rows.fechaCreacion=corpo.created_at
        rows.UsuarioCreacion=corpo.user_created.username
        rows.UsuarioAsignado=corpo.asignado.username
        rows.Status=corpo.S_Activo
        console.log(rows)
        this.tempData.push(rows);
        setTimeout(() => {
          this.spinner.hide();
        }, 3000);
      }
      this.rows=this.tempData
      this.corpoInicialForm.disable();
    },
    (error) =>{
      console.log(error)
      setTimeout(() => {
        this.spinner.hide();
      }, 3000);

    });
  }
}
