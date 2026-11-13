import { describe, it, expect } from 'vitest';
import {
  STOCK_MINIMO,
  estaBajoStock,
  calcularValorInventario,
  validarProducto
} from './reglas-inventario.js';

describe('estaBajoStock', () => {
  it('marca stock bajo cuando hay pocas unidades', () => {
    expect(estaBajoStock(3)).toBe(true);
  });

  it('no marca stock bajo cuando hay muchas unidades', () => {
    expect(estaBajoStock(20)).toBe(false);
  });

  it('marca stock bajo en el limite exacto (STOCK_MINIMO)', () => {
    expect(estaBajoStock(STOCK_MINIMO)).toBe(true);
  });

  it('no marca stock bajo una unidad por encima del limite', () => {
    expect(estaBajoStock(STOCK_MINIMO + 1)).toBe(false);
  });
});

describe('calcularValorInventario', () => {
  it('suma precio por stock de cada producto', () => {
    const productos = [
      { precio: 1000, stock: 2 },
      { precio: 500, stock: 4 }
    ];
    expect(calcularValorInventario(productos)).toBe(4000);
  });

  it('devuelve 0 con una lista vacia', () => {
    expect(calcularValorInventario([])).toBe(0);
  });
});

describe('validarProducto', () => {
  it('acepta un producto valido', () => {
    expect(validarProducto({ nombre: 'Regla', precio: 2000, stock: 10 })).toBeNull();
  });

  it('rechaza un nombre vacio', () => {
    expect(validarProducto({ nombre: '', precio: 2000, stock: 10 })).toBe('El nombre es obligatorio');
  });

  it('rechaza un precio negativo', () => {
    expect(validarProducto({ nombre: 'Regla', precio: -5, stock: 10 })).toMatch(/precio/);
  });

  it('rechaza un stock decimal', () => {
    expect(validarProducto({ nombre: 'Regla', precio: 2000, stock: 2.5 })).toMatch(/stock/);
  });
});