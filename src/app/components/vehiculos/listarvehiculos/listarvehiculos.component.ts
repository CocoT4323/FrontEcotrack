import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink, RouterModule } from '@angular/router';
import { Vehiculos } from '../../../models/Vehiculos';
import { vehiculosService } from '../../../services/vehiculos.service';

@Component({
  selector: 'app-listarvehiculos',
  standalone: true,
  imports: [MatTableModule,
            CommonModule,
            MatIconModule,
            RouterLink,
            RouterModule,
            MatButtonModule
  ],
  templateUrl: './listarvehiculos.component.html',
  styleUrl: './listarvehiculos.component.css'
})
export class ListarvehiculosComponent implements OnInit {
  dataSource: MatTableDataSource<Vehiculos>= new MatTableDataSource();
  displayedColumns: string[] = [
    'c1',
    'c2',
    'c3',
    'c4',
    'c5',
    'c6',
    'c7',
    'c8',
    'accion01',
    'accion02',
  ];
  
  constructor(private vS: vehiculosService){

  }
  
  ngOnInit(): void {
    this.vS.list().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data);
    });
    this.vS.getList().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data);
    });
  }
  eliminar(id:number){
    this.vS.delete(id).subscribe((data)=>{
      this.vS.list().subscribe((data)=>{
        this.vS.setList(data);
      })
    })
  }
}
