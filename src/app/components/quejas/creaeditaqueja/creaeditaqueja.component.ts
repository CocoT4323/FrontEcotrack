import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Quejas } from '../../../models/Quejas';
import { Usuarios } from '../../../models/Usuarios';
import { QuejasService } from '../../../services/quejas.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsuariosService } from '../../../services/usuarios.service';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-creaeditaqueja',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule,
    MatMomentDateModule,
  ],
  templateUrl: './creaeditaqueja.component.html',
  styleUrl: './creaeditaqueja.component.css'
})
export class CreaeditaquejaComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  id: number = 0;
  edicion: boolean = false;
  listaUsuarios:Usuarios[]=[];
  listaTipos: { value: String; viewValue: string }[] = [
    { value: 'Problemas con la calidad del producto', viewValue: 'Problemas con la calidad del producto' },
    { value: 'Retrasos en la entrega', viewValue: 'Retrasos en la entrega' },
    { value: 'Errores en el pedido', viewValue: 'Errores en el pedido' },
    { value: 'Problemas con la facturación', viewValue: 'Problemas con la facturación' },
    { value: 'Atención al cliente', viewValue: 'Atención al cliente' },
    { value: 'Problemas con el estado de los lotes', viewValue: 'Problemas con el estado de los lotes' },
    { value: 'Problemas con el sistema de registro o la plataforma', viewValue: 'Problemas con el sistema de registro o la plataforma' },
    { value: 'Reclamos sobre precios o tarifas', viewValue: 'Reclamos sobre precios o tarifas' },
    { value: 'Problemas con la disponibilidad de productos', viewValue: 'Problemas con la disponibilidad de productos' },
    { value: 'Condiciones de entrega', viewValue: 'Condiciones de entrega' },
    { value: 'Reclamos por términos contractuales', viewValue: 'Reclamos por términos contractuales' },
    { value: 'Otro...', viewValue: 'Otro...' },

  ];

  queja: Quejas = new Quejas();

  constructor(
    private formBuilder: FormBuilder,
    private router:Router,
    private route: ActivatedRoute,
    private uS:UsuariosService,
    private qS: QuejasService
  ){}

  
  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });
    this.form = this.formBuilder.group({
      hcodigo: new FormControl(''),
      htitulo: new FormControl('', Validators.required),
      hdescripcion: new FormControl('', Validators.required),
      hfecha: new FormControl({ value: new Date(), disabled: true }, Validators.required),
      htipo: new FormControl('', Validators.required),
      husuario: new FormControl('', Validators.required),
    });
    this.uS.list().subscribe((data)=>{
      this.listaUsuarios=data;
    });
  }


  insertar():void{
    if(this.form.valid){
      this.queja.idQuejas=this.form.value.hcodigo
      this.queja.titulo=this.form.value.htitulo
      this.queja.descripcion=this.form.value.hdescripcion
      this.queja.fecha_creacion=this.form.get('hfecha')?.value
      this.queja.tipo=this.form.value.htipo
      this.queja.usuario.idUsuarios=this.form.value.husuario

      if(this.edicion){
        this.qS.update(this.queja).subscribe((data)=>{
          this.qS.list().subscribe((data)=>{
            this.qS.setList(data);
          });
        });
      } else {
        this.qS.insert(this.queja).subscribe(data=>{
          this.qS.list().subscribe(data=>{
            this.qS.setList(data)
          });
        });
      }
    }
    this.router.navigate(['quejas'])
  }

  init() {
    if (this.edicion) {
      this.qS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          hcodigo: new FormControl(data.idQuejas),
          htitulo: new FormControl(data.titulo),
          hdescripcion: new FormControl(data.descripcion),
          hfecha: new FormControl(data.fecha_creacion),
          htipo: new FormControl(data.tipo),
          husuario: new FormControl(data.usuario.nombre),
        });
      });
    }
  }
}