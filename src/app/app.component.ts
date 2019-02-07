import { Component, OnInit, ViewChild, Input } from '@angular/core';
// import { Observable } from 'rxjs/Observable';
// import { OpenStreetMapProvider } from 'leaflet-geosearch';
// import { OpenCageProvider } from 'leaflet-geosearch';

import {
    GeoSearchControl,
    OpenStreetMapProvider,
} from 'leaflet-geosearch';
import {
    latLng,
    tileLayer,
    circle,
    polygon,
    marker,
    polyline,
    rectangle,
    point
} from 'leaflet';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    options;

    buscar;

    layers;

    center = null;

    zoom = 10;
    // layersControl = {
    //     baseLayers: {
    //         'Open Street Map': tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' }),
    //         'Open Cycle Map': tileLayer('http://{s}.tile.opencyclemap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    //     },
    //     overlays: {
    //         'Big Circle': circle([ 46.95, -122 ], { radius: 5000 }),
    //         'Big Square': polygon([[ 46.8, -121.55 ], [ 46.9, -121.55 ], [ 46.9, -121.7 ], [ 46.8, -121.7 ]])
    //     }
    // }


    constructor() {

        // const provider = new OpenStreetMapProvider();
        // const searchControl = new GeoSearchControl({
        //     provider: provider
        // });

        // this.input.addEventListener('submit', async (event) => {
        //     event.preventDefault();

        //     const results = await provider.search({ query: this.input.value });
        //     console.log(results); // » [{}, {}, {}, ...]
        // })
    }


    ngOnInit() {
        this.options = {
            layers: [
                tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                    { maxZoom: 18 })
            ],
            zoom: 10,
            center: latLng(46.879966, -121.726909)
        };


        this.layers = [
            circle([46.95, -122], { radius: 5000 }),
            // polygon([[46.8, -121.85], [46.92, -121.92], [46.87, -121.8]]),
            marker([46.879966, -121.726909])
        ];


    }


    async buscarEndereco() {


        const provider = new OpenStreetMapProvider();
        const searchControl = new GeoSearchControl({
            provider: provider
        });
        const results = await provider.search({ query: this.buscar });
        console.log(results);

        if (results.length) {
            //Funciona

            // this.layers.push(marker(results[0].bounds[0], {
            //     title: 'Rua Domingos', alt: '',
            // })
            // );
            // console.log(results[0].x);

            // this.layers.push(polygon([
            //     [-23.580291225519307, -46.723201274871826],
            //     [-23.5830051006115, -46.72054052352906],
            //     [-23.578049286383663, -46.71691417694092],
            //     [-23.578422945565144, -46.72202110290527],
            //     [-23.580291225519307, -46.723201274871826]
            // ]));

            this.layers.push(marker(
                [results[0].raw.lat, results[0].raw.lon]
            ));

            this.layers.push(rectangle(results[0].bounds
            ))

            console.log(this.layers);

            this.center = latLng(results[0].bounds[0][0], results[0].bounds[0][1]);
            this.zoom = 16;
        }

    }

    onReadyMap($event) {
        console.log($event.latlng);
    }

}
