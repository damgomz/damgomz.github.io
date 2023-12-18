


/*
	Run the action when we are sure the DOM has been loaded
	https://developer.mozilla.org/en-US/docs/Web/Events/DOMContentLoaded
	Example:
	whenDocumentLoaded(() => {
		console.log('loaded!');
		document.getElementById('some-element');
	});
*/
function whenDocumentLoaded(action) {
	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", action);
	} else {
		// `DOMContentLoaded` already fired
		action();
	}
}

//const MARGIN = { top: 10, right: 10, bottom: 10, left: 10 };


class Tool {
	constructor(svg_element_id) {

		let svg_width  = 1100
		let svg_heigth = 500
		let margin     = 10

		let TP = 0
		let TN = 0
		let FP = 0
		let FN = 0

		let background_color = '#D3D3D3'

		let color_rect_vert   = '#1E90FF'
		let color_rect_vert_2 = '#1E90FF'

		let color_rect_hor    = '#EF1E72'
		let color_rect_hor_2  = '#EF1E72'

		let border_thickness  = 2
		let border_color	  = 'black'

		let width  = 500
		let height = 400

		let my = (svg_heigth - height)/2
		let mx = 50 

		let confusion_width = 200
		let confusion_height = 120

		let init_gap = 50
		let init_gap_2 = 100
		let gap_rate = 20

		let radius = 3
		let num_col_circles = 30
		let num_row_circles = 20
		let space_col = width/(num_col_circles+1)
		let space_row = height/(num_row_circles+1)

		let flag = 0

		const datas = []


		for (let i = 1; i <= num_row_circles; i++) {
			for (let j = 1; j <= num_col_circles; j++){
				datas.push({
					x: mx + j * space_col,
					y: my + (i * space_row),
				})
			}
		}

		this.svg = d3.select('#' + svg_element_id);

		this.svg.append('rect')
				.attr('class', 'background_rect')
				.attr('x', mx)
				.attr('y', my)
				.attr('width', width)
				.attr('height', height)
				.attr('fill', background_color);


		/*__________________________________________________________________________*/

		this.svg.append('rect')
				.attr('class', 'confusion_mtx')
				.attr('x', svg_width - margin - confusion_width)
				.attr('y', my + (height - confusion_height)/2)
				.attr('width', confusion_width)
				.attr('height', confusion_height)
				.attr('stroke', border_color)
				.attr('stroke-width', border_thickness)
				.attr('fill', background_color)

		this.svg.append('rect')
				.attr('class', 'confusion_mtx_up')
				.attr('x', svg_width - margin - confusion_width)
				.attr('y', my + (height - confusion_height)/2 - confusion_height/2)
				.attr('width', confusion_width)
				.attr('height', confusion_height/2)
				.attr('stroke', border_color)
				.attr('stroke-width', border_thickness)
				.attr('fill', background_color);

		this.svg.append('rect')
				.attr('class', 'confusion_mtx_left')
				.attr('x', svg_width - margin - confusion_width - (confusion_width/2))
				.attr('y', my + (height - confusion_height)/2)
				.attr('width', confusion_width/2)
				.attr('height', confusion_height)
				.attr('stroke', border_color)
				.attr('stroke-width', border_thickness)
				.attr('fill', background_color);

		this.svg.append('line')
				.attr('class', 'verticale_line')
				.attr('stroke', border_color)
				.attr('stroke-width', border_thickness)
				.attr('x1', svg_width - margin - (confusion_width/2))
				.attr('y1', my + (height - confusion_height)/2 - confusion_height/2)
				.attr('x2', svg_width - margin - (confusion_width/2))
				.attr('y2', my + (height - confusion_height)/2 + confusion_height)

		this.svg.append('line')
				.attr('class', 'horizontale_line')
				.attr('stroke', border_color)
				.attr('stroke-width', border_thickness)
				.attr('x1', svg_width - margin - confusion_width - (confusion_width/2))
				.attr('y1', my + height/2)
				.attr('x2', svg_width - margin)
				.attr('y2', my + height/2)

		this.svg.append('text')
				.text('Negative')
				.attr('x', svg_width - margin - (confusion_width*0.75))
				.attr('y', my + height/2 - confusion_height * 0.75)
				.attr('text-anchor', 'middle')
				.attr('dominant-baseline', 'middle')

		this.svg.append('text')
				.text('Positive')
				.attr('x', svg_width - margin - (confusion_width*0.25))
				.attr('y', my + height/2 - confusion_height * 0.75)
				.attr('text-anchor', 'middle')
				.attr('dominant-baseline', 'middle')

		this.svg.append('text')
				.text('Negative')
				.attr('x', svg_width - margin - (confusion_width*1.25))
				.attr('y', my + height/2 - confusion_height * 0.25)
				.attr('text-anchor', 'middle')
				.attr('dominant-baseline', 'middle')

		this.svg.append('text')
				.text('Positive')
				.attr('x', svg_width - margin - (confusion_width*1.25))
				.attr('y', my + height/2 + confusion_height * 0.25)
				.attr('text-anchor', 'middle')
				.attr('dominant-baseline', 'middle')

		this.svg.append('text')
				.text('Reality')
				.attr('x', svg_width - margin - (confusion_width*0.5))
				.attr('y', my + height/2 - confusion_height * 1.25)
				.attr('text-anchor', 'middle')
				.attr('dominant-baseline', 'middle')
		
		this.svg.append('text')
				.text('Prediction')
				.attr('text-anchor', 'middle')
				.attr('dominant-baseline', 'middle')
				.attr('x', svg_width - margin - confusion_width * 1.5 - confusion_height*0.25)
				.attr('y', my + height/2)
				.attr('transform', 'rotate(-90,' + (svg_width - margin - confusion_width * 1.5 - confusion_height*0.25).toString() + ',' + (my + height/2).toString() +')')
		
		/*__________________________________________________________________________*/
		
		this.svg.selectAll('circle')
				.data(datas)
				.enter()
				.append('circle')
				.attr('cx', d => d.x)
				.attr('cy', d => d.y)
				.attr('r', radius)
				.attr('class', 'dots')
				//.attr('stroke', '#FFFFFF')
				//.attr('stroke-width', 1)

		this.svg.append('rect')
				.attr('class', 'vertical_rect')
				.attr('x', mx)
				.attr('y', my)
				.attr('width', init_gap)
				.attr('height', height - init_gap_2)
				.attr('opacity', 0.2)
				.attr('fill', color_rect_vert)
				.attr('stroke', border_color)
				.attr('stroke-width', border_thickness)

		this.svg.append('rect')
				.attr('class', 'horizontal_rect')
				.attr('x', mx + init_gap)
				.attr('y', my + height - init_gap)
				.attr('width', width - init_gap)
				.attr('height', init_gap)
				.attr('opacity', 0.2)
				.attr('fill', color_rect_hor)
				.attr('stroke', border_color)
				.attr('stroke-width', border_thickness)
		
		this.svg.append('rect')
				.attr('class', 'horizontal_rect_2')
				.attr('x', mx + init_gap)
				.attr('y', my)
				.attr('width', width - init_gap)
				.attr('height', height-init_gap)
				.attr('opacity', 0.2)
				.attr('fill', color_rect_hor_2)
				.attr('stroke', border_color)
				.attr('stroke-width', border_thickness)
		
		this.svg.append('rect')
				.attr('class', 'vertical_rect_2')
				.attr('x', mx)
				.attr('y', my + height - init_gap_2)
				.attr('width', init_gap)
				.attr('height', init_gap_2)
				.attr('opacity', 0.2)
				.attr('fill', color_rect_vert_2)
				.attr('stroke', border_color)
				.attr('stroke-width', border_thickness)

		d3.selectAll('.dots').attr('fill', function(d) {return color_dots(d)})

		this.svg.append('circle')
				.attr('class', 'dragging_point_v')
				.attr('cy', my + height - init_gap)
				.attr('cx', mx + init_gap + (width - init_gap)/2)
				.attr('r', 10)
				.attr('fill', '#FFFFFF');

		this.svg.append('circle')
				.attr('class', 'dragging_point_v_2')
				.attr('cy', my + height - init_gap_2)
				.attr('cx', mx + init_gap/2)
				.attr('r', 10)
				.attr('fill', '#FFFFFF');

		this.svg.append('circle')
				.attr('class', 'dragging_point_h')
				.attr('cy', my + (height - init_gap)/2)
				.attr('cx', mx + init_gap)
				.attr('r', 10)
				.attr('fill', '#FFFFFF');

		/*__________________________________________________________________________*/

		this.svg.append('text')
				.text(TN.toString())
				.attr('class', 'TN')
				.attr('x', svg_width - margin - (confusion_width*0.75))
				.attr('y', my + height/2 - confusion_height * 0.25)
				.attr('text-anchor', 'middle')
				.attr('dominant-baseline', 'middle')
				.attr("fill", color_rect_hor_2)
				.attr('font-weight', 'bold')

		this.svg.append('text')
				.text(FN.toString())
				.attr('class', 'FN')
				.attr('x', svg_width - margin - (confusion_width*0.25))
				.attr('y',my + height/2 - confusion_height * 0.25)
				.attr('text-anchor', 'middle')
				.attr('dominant-baseline', 'middle')
				.attr("fill", color_rect_vert)
				.attr('font-weight', 'bold')

		this.svg.append('text')
				.text(FP.toString())
				.attr('class', 'FP')
				.attr('x', svg_width - margin - (confusion_width*0.75))
				.attr('y', my + height/2 + confusion_height * 0.25)
				.attr('text-anchor', 'middle')
				.attr('dominant-baseline', 'middle')
				.attr("fill", '#FFEDED')
				.attr('font-weight', 'bold')

		this.svg.append('text')
				.text(TP.toString())
				.attr('class', 'TP')
				.attr('x', svg_width - margin - (confusion_width*0.25))
				.attr('y', my + height/2 + confusion_height * 0.25)
				.attr('text-anchor', 'middle')
				.attr('dominant-baseline', 'middle')
				.attr("fill", '#DAF0FF')
				.attr('font-weight', 'bold')

		/*__________________________________________________________________________*/

		this.svg.append('text')
			.text(((TN/(TN+FP)) * 100).toFixed(2).toString() + '%')
			.attr('class', 'TN_rate')
			.attr('x', mx + width + gap_rate)
			.attr('y', my + (height - init_gap)/2)
			.attr('text-anchor', 'middle')
			.attr('dominant-baseline', 'middle')
			.attr('transform', 'rotate(90,' + (mx + width + gap_rate).toString() + ',' + (my + (height - init_gap)/2).toString() +')')

		this.svg.append('text')
			.text(((FP/(FP+TN)) * 100).toFixed(2).toString() + '%')
			.attr('class', 'FP_rate')
			.attr('x', mx + width + gap_rate)
			.attr('y', my + height - init_gap/2)
			.attr('text-anchor', 'middle')
			.attr('dominant-baseline', 'middle')
			.attr('transform', 'rotate(90,' + (mx + width + gap_rate).toString() + ',' + (my + height - init_gap/2).toString() +')')

		this.svg.append('text')
		    .text(((FN/(FN+TP)) * 100).toFixed(2).toString() + '%')
			.attr('class', 'FN_rate')
			.attr('x', mx - gap_rate)
			.attr('y', my + (height - init_gap_2)/2)
			.attr('text-anchor', 'middle')
			.attr('dominant-baseline', 'middle')
			.attr('transform', 'rotate(-90,' + (mx - gap_rate).toString() + ',' + (my + (height - init_gap_2)/2).toString() +')')

		this.svg.append('text')
		    .text(((TP/(FN+TP)) * 100).toFixed(2).toString() + '%')
			.attr('class', 'TP_rate')
			.attr('x', mx - gap_rate)
			.attr('y', my + height - init_gap_2/2)
			.attr('text-anchor', 'middle')
			.attr('dominant-baseline', 'middle')
			.attr('transform', 'rotate(-90,' + (mx - gap_rate).toString() + ',' + (my + height - init_gap_2/2).toString() +')')

		this.svg.append('text')
			.text((((TP + FN)/(FP+TN+TP+FN)) * 100).toFixed(2).toString() + '%')
			.attr('class', 'P_rate')
			.attr('x', mx + init_gap/2)
			.attr('y', my + height + gap_rate)
			.attr('text-anchor', 'middle')
			.attr('dominant-baseline', 'middle')

		this.svg.append('text')
		    .text((((TN + FP)/(FP+TN+TP+FN)) * 100).toFixed(2).toString() + '%')
			.attr('class', 'N_rate')
			.attr('x', mx + init_gap + (width - init_gap)/2)
			.attr('y', my + height + gap_rate)
			.attr('text-anchor', 'middle')
			.attr('dominant-baseline', 'middle')


		/*__________________________________________________________________________*/

		
		this.svg.append('circle')
				.attr('class', 'button')
				.attr('cy', my + (height*6/7))
				.attr('cx', svg_width - margin - confusion_width - 220)
				.attr('r', 40)
				.attr('fill', '#FF0000')
				.attr('stroke', border_color)
				.attr('stroke-width', border_thickness)

		this.svg.append('text')
				.attr('class', 'ON_OFF')
				.text('OFF')
				.attr('x', svg_width - margin - confusion_width - 220)
				.attr('y', my + (height*6/7) + 2)
				.style("font-size", "1.5em")
				.attr('text-anchor', 'middle')
				.attr('dominant-baseline', 'middle')

		this.svg.append('circle')
			.attr('cy', my + (height*6/7))
			.attr('cx', svg_width - margin - confusion_width - 220)
			.attr('r', 40)
			.attr('opacity', 0)
			.attr('fill', '#FF0000')
			.on("click", function() {
				if (flag == 0) {
					d3.select('.horizontal_rect').attr('fill', '#3CB043').attr('opacity', 0.8)
					d3.select('.vertical_rect_2').attr('fill', '#3CB043').attr('opacity', 0.8)
					d3.select('.num_tested').attr('opacity', 1.0)
					d3.select('.button').attr('fill', '#3CB043')
					d3.select('.ON_OFF').text('ON')
					flag = 1
				} else {
					d3.select('.horizontal_rect').attr('fill', color_rect_hor).attr('opacity', 0.2)
					d3.select('.vertical_rect_2').attr('fill', color_rect_vert_2).attr('opacity', 0.2)
					d3.select('.num_tested').attr('opacity', 0)
					d3.select('.button').attr('fill', '#FF0000')
					d3.select('.ON_OFF').text('OFF')
					flag = 0
				}
			})

		this.svg.append('text')
				.attr('class', 'num_tested')
				.text((TP+FP).toString() + ' positive tests')
				.attr('opacity', 0)
				.attr('x', svg_width - margin - confusion_width - 30)
				.attr('y', my + (height*6/7))
				.style("font-size", "2.0em")
				.attr('fill', '#3CB043')
				.attr('text-anchor', 'middle')
				.attr('dominant-baseline', 'middle')


		/*__________________________________________________________________________*/

		this.svg.select('.dragging_point_h')
				.call(d3.drag()
				.on('drag',  function () {
					if (mx <= d3.event.x & d3.event.x <= width + mx) {

						TP = 0
						TN = 0
						FP = 0
						FN = 0

						d3.select(this).attr("cx", d3.event.x)
						d3.select('.vertical_rect').attr("width", d3.event.x - mx)
						d3.select('.horizontal_rect').attr('x', d3.event.x).attr('width', width - d3.event.x + mx)
						d3.select('.horizontal_rect_2').attr('x', d3.event.x).attr('width', width - d3.event.x + mx)
						d3.select('.dragging_point_v').attr('cx', mx + d3.event.x + (width - d3.event.x - mx)/2)
						d3.select('.dragging_point_v_2').attr('cx', mx + (d3.event.x - mx)/2)
						d3.select('.vertical_rect_2').attr('width', d3.event.x - mx)
						d3.selectAll('.dots').attr('fill', function(d) {return color_dots(d)})
						
						d3.select('.TP').text(TP.toString())
						d3.select('.TN').text(TN.toString())
						d3.select('.FP').text(FP.toString())
						d3.select('.FN').text(FN.toString())

						d3.select('.P_rate').attr('x', mx + (d3.event.x - mx)/2).text((((TP + FN)/(FP+TN+TP+FN)) * 100).toFixed(2).toString() + '%')
						d3.select('.N_rate').attr('x', d3.event.x + (width - (d3.event.x - mx))/2).text((((TN + FP)/(FP+TN+TP+FN)) * 100).toFixed(2).toString() + '%')

						d3.select('.num_tested').text((TP+FP).toString() + ' positive tests')

					}
				})
				.on("start", function () {d3.select(this).raise().attr("stroke", "black");})
				.on("end",   function () {d3.select(this).attr("stroke", null);})
				)
		
		this.svg.select('.dragging_point_v')
				.call(d3.drag()
				.on('drag',  function () {
					if (my <= d3.event.y & d3.event.y <= height + my) {

						TP = 0
						TN = 0
						FP = 0
						FN = 0

						d3.select(this).attr('cy', d3.event.y)
						d3.select('.horizontal_rect').attr('y', d3.event.y).attr('height', height + my - d3.event.y)
						d3.select('.horizontal_rect_2').attr('height', d3.event.y - my)
						d3.select('.dragging_point_h').attr('cy', my + (d3.event.y - my)/2)
						d3.selectAll('.dots').attr('fill', function(d) {return color_dots(d)})

						d3.select('.TP').text(TP.toString())
						d3.select('.TN').text(TN.toString())
						d3.select('.FP').text(FP.toString())
						d3.select('.FN').text(FN.toString())

						d3.select('.TN_rate')
						  .attr('y', my + (d3.event.y - my)/2).attr('transform', 'rotate(90,' + (mx + width + gap_rate).toString() + ',' + (my + (d3.event.y - my)/2).toString() +')')
						  .text(((TN/(FP+TN)) * 100).toFixed(2).toString() + '%')
						d3.select('.FP_rate')
						  .attr('y', d3.event.y + (height - (d3.event.y - my))/2).attr('transform', 'rotate(90,' + (mx + width + gap_rate).toString() + ',' + (d3.event.y + (height - (d3.event.y - my))/2).toString() +')')
						  .text((FP/(FP+TN)).toString())
						  .text(((FP/(FP+TN)) * 100).toFixed(2).toString() + '%')

						d3.select('.num_tested').text((TP+FP).toString() + ' positive tests')
					}
				})
				.on("start", function () {d3.select(this).raise().attr("stroke", "black");})
				.on("end",   function () {d3.select(this).attr("stroke", null);})
				)
		
		this.svg.select('.dragging_point_v_2')
				.call(d3.drag()
				.on('drag',  function () {
					if (my <= d3.event.y & d3.event.y <= height + my) {

						TP = 0
						TN = 0
						FP = 0
						FN = 0

						d3.select(this).attr('cy', d3.event.y)
						d3.select('.vertical_rect').attr('height', d3.event.y - my)
						d3.select('.vertical_rect_2').attr('y', d3.event.y).attr('height', height + my - d3.event.y)
						d3.selectAll('.dots').attr('fill', function(d) {return color_dots(d)})

						d3.select('.TP').text(TP.toString())
						d3.select('.TN').text(TN.toString())
						d3.select('.FP').text(FP.toString())
						d3.select('.FN').text(FN.toString())

						d3.select('.FN_rate').attr('y', my + (d3.event.y - my)/2)
						  .attr('transform', 'rotate(-90,' + (mx - gap_rate).toString() + ',' + (my + (d3.event.y - my)/2).toString() +')')
						  .text(((FN/(FN+TP)) * 100).toFixed(2).toString() + '%')
						d3.select('.TP_rate').attr('y', d3.event.y + (height - (d3.event.y - my))/2)
						  .attr('transform', 'rotate(-90,' + (mx - gap_rate).toString() + ',' + (d3.event.y + (height - (d3.event.y - my))/2).toString() +')')
						  .text(((TP/(FN+TP)) * 100).toFixed(2).toString() + '%')

						d3.select('.num_tested').text((TP+FP).toString() + ' positive tests')
					}
				})
				.on("start", function () {d3.select(this).raise().attr("stroke", "black");})
				.on("end",   function () {d3.select(this).attr("stroke", null);})
				)



		function color_dots(d) {
			if(contain(d3.select('.vertical_rect'), d)){
				FN += 1
				return color_rect_vert
			}
			if (contain(d3.select('.vertical_rect_2'), d)){
				TP += 1
				return '#DAF0FF'
			} 
			if (contain(d3.select('.horizontal_rect'), d)){
				FP += 1
				return '#FFEDED'
			} else {
				TN += 1
				return color_rect_hor_2
			}
		}

		function stroke_opacity(d) {
			if(contain(d3.select('.vertical_rect'), d)){
				return 0
			}
			if (contain(d3.select('.vertical_rect_2'), d)){
				return 1
			} 
			if (contain(d3.select('.horizontal_rect'), d)){
				return 1
			} else {
				return 0
			}
		}

		function contain(rectangle, d) {
			var border = rectangle.node().getBBox()

			if (d.x > border.x && 
				d.x < border.x + border.width && 
				d.y > border.y && 
				d.y < border.y + border.height) {
					return true
				} else {
					return false
				}
		}
	}
}

whenDocumentLoaded(() => {

	// prepare the data here

	//console.log(data);

	const plot = new Tool('plot');
});

