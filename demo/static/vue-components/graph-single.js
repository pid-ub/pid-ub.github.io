Vue.component('graph-single', {

    props: ['panel_title', 'width', 'data'],

    data: function () {
        return {
            graph_id: 'graph-' + (Math.random() * 10000).toFixed(0),
            //width : 6,
            //panel_title: 'Panel Title',
            graph_title: 'Graph Title',
            graph_legend: ['Actor', 'Contribution'],
            graph_unit: '%',
            // data: [
            //     {label: 'Student', value: 60, color: '#F77'},
            //     {label: 'Teacher', value: 15, color: '#7F7'},
            //     {label: 'Tutor', value: 25, color: '#77F'}
            // ],
            labels: [
                'Student', 'Teacher', 'Tutor'
            ],
            text: 'Explanation text'
        }
    },

    computed: {
        col_classes: function () {
            return `col-md-${this.width} col-sm-${this.width} col-xs-12`;
        }
    },

    mounted: function () {
        console.log(`Init graph ${this.panel_title}`)

        let config = {
            type: 'doughnut',

            data: {

                datasets: [{
                    data: this.data.map(e => e.value),
                    backgroundColor: this.data.map(e => e.color),
                    label: ''
                }],

                labels: this.labels

            },

            options: {
                responsive: false,
                legend: {
                    display: false,
                    position: 'top',
                },
                title: {
                    display: false,
                    text: this.graph_title
                },
                animation: {
                    animateScale: true,
                    animateRotate: true
                }
            }
        };

        let g_el = $(`#${this.graph_id}`);

        new Chart(g_el, config)


    },

    template: `<div :class="col_classes">
        <div class="x_panel tile fixed_height_320 overflow_hidden">
        
          <div class="x_title">
            <h2>{{ panel_title }}</h2>
            <div class="clearfix"></div>
          </div>
          
          <div class="x_content">
            <table class="" style="width:100%">
              <tbody><tr>
                <th style="width:37%;">
                  <p>{{ graph_title }}</p>
                </th>
                
                
                <th>
                  <div class="col-lg-7 col-md-7 col-sm-7 col-xs-7">
                    <p class="">{{ graph_legend[0] }}</p>
                  </div>
                  <div class="col-lg-5 col-md-5 col-sm-5 col-xs-5">
                    <p class="">{{ graph_legend[1] }}</p>
                  </div>
                </th>
                
              </tr>
              
              <tr>
                <td>
                                 
                  <canvas :id="graph_id" height="140" width="140" style="margin: 15px 10px 10px 0px; width: 140px; height: 140px;"></canvas>
                  
                </td>
                <td>
                  <table class="tile_info">
                    <tbody>
                    
                    <tr v-for="item in data">
                      <td>
                        <p><i class="fa fa-square" :style="{color: item.color}"></i>{{item.label}} </p>
                      </td>
                      <td>{{item.value}}{{graph_unit}}</td>
                    </tr>
                                        
                  </tbody></table>
                </td>
              </tr>
              
            </tbody></table>
            
            {{text}}
          </div>
        </div>
      </div>`,


});