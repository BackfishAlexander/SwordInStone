import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { TooltipService } from '../services/tooltip-service.service';

@Directive({
  selector: '[appTooltip]'
})
export class TooltipDirective {
  @Input('appTooltipTitle') tooltipTitle!: string;
  @Input('appTooltipDescription') tooltipDescription!: string;
  @Input('appTooltipBackgroundColor') tooltipBackgroundColor: string = '#000000'; // Default color in hex

  constructor(private el: ElementRef, private tooltipService: TooltipService) {}


  estimateTooltipHeight(description: string): number {
    const charactersPerLine = 49;  // Assuming about 50 characters fit per line for a width of 300px
    const lineHeight = 25;         // Approximate line height in pixels
    const numberOfLines = Math.ceil(description.length / charactersPerLine);
    
    // Assuming some extra padding (e.g., for title or margin)
    const extraPadding = 40;       // Padding/margin for title and spacing
  
    return numberOfLines * lineHeight + extraPadding;
  }

  @HostListener('mousemove', ['$event']) onMouseMove(event: MouseEvent) {
    // Default offsets for tooltip position
    const offsetX = 10; // Horizontal space between mouse cursor and tooltip
    const offsetY = 10; // Vertical space between mouse cursor and tooltip
  
    // Tooltip dimensions (estimated or dynamically adjustable)
    const tooltipWidth = 300;  // Estimated width of the tooltip in pixels
    const tooltipHeight = this.estimateTooltipHeight(this.tooltipDescription);; // Estimated height of the tooltip in pixels
  
    // Get the viewport dimensions
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
  
    // Calculate default position of tooltip to the right and below the cursor
    let x = event.clientX + offsetX;  // Default: Tooltip to the right of the cursor
    let y = event.clientY + offsetY;  // Default: Tooltip below the cursor
  
    // Adjust position to the left of the cursor if it overflows to the right
    if (x + tooltipWidth > viewportWidth) {
      x = event.clientX - tooltipWidth - offsetX; // Move tooltip to the left of the cursor
    }
  
    // Ensure the tooltip does not overflow below the bottom of the viewport
    if (y + tooltipHeight > viewportHeight) {
      y = viewportHeight - tooltipHeight - offsetY; // Adjust upwards to prevent overflow
    }
  
    // Pass the calculated position to the tooltip service to render the tooltip
    this.tooltipService.showTooltip(x, y, this.tooltipTitle, this.tooltipDescription, this.tooltipBackgroundColor);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.tooltipService.hideTooltip();
  }
}