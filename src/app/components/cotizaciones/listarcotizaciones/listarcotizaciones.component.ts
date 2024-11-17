import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { Cotizaciones } from '../../../models/Cotizaciones';
import { CotizacionesService } from '../../../services/cotizaciones.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { LoginService } from '../../../services/login.service';
@Component({
  selector: 'app-listarcotizaciones',
  standalone: true,
  imports: [MatPaginator,MatTableModule, MatIconModule, MatButtonModule, RouterModule],
  templateUrl: './listarcotizaciones.component.html',
  styleUrl: './listarcotizaciones.component.css'
})
export class ListarcotizacionesComponent implements OnInit{
  dataSource: MatTableDataSource<Cotizaciones>=new MatTableDataSource();

  displayedColumns:string[]=['c1','c2','c3','c4','accion01','accion02',]
  username:string=''

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private cS:CotizacionesService,
    private snackBar: MatSnackBar,
    private loginService: LoginService

  ){}

  ngOnInit(): void { 

    this.username=this.loginService.showUsername();


    this.cS.listByUsername(this.username).subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      if (this.dataSource.data.length === 0) {
        this.mostrarMensajeSinDatos();
      }
    });
    
    this.cS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  mostrarMensajeSinDatos() {
    this.snackBar.open('No hay datos agregados...', 'Cerrar', {
      duration: 3000, // Duración en milisegundos
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
  eliminar(id:number){
    this.cS.delete(id).subscribe((data)=>{
      this.cS.listByUsername(this.username).subscribe((data)=>{
        this.cS.setList(data);
      });
    });
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
