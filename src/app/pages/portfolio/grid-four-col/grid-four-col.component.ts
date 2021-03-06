import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-grid-four-col',
  templateUrl: './grid-four-col.component.html',
  styleUrls: ['./grid-four-col.component.scss']
})
export class GridFourColComponent implements AfterViewInit {

  @ViewChild('gallery', { static: true }) galleryElement: ElementRef;	

  constructor() { 
  	$.getScript('assets/js/portfolio.js');
  }

  ngAfterViewInit() {
  	$(this.galleryElement.nativeElement).magnificPopup({
        delegate: 'a',
        type: 'image',
        closeOnContentClick: false,
        closeBtnInside: false,
        mainClass: 'mfp-with-zoom mfp-img-mobile',
        image: {
            verticalFit: true,
            titleSrc: function(item) {
                return item.el.attr('title') + ' &middot;';
            }
        },
        gallery: {
            enabled: true
        },
        zoom: {
            enabled: true,
            duration: 300, // don't foget to change the duration also in CSS
            opener: function(element) {
                return element.find('img');
            }
        }
    });   
  }

}
