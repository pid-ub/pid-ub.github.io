Vue.component('student-table', {
    props: {
        students: [],
        showImage: {default:true},
        showIndex: {default:true},
        showDegrees: {default:true},
        showStats: {default:true},
        showActions: {default:true},
        showRank: {default:false},
    },
    data: function () {
        return { }
    },

    methods: {
        getBGClasses(grade) {
            let color = 'bg-green';
            if (grade < 7) color = 'bg-orange';
            if (grade < 5) color = 'bg-red';
            return `progress-bar ${color}`
        },

		getRecordRank(record){
			if (record.percentile <= 1) return "S";
			if (record.percentile <= 10) return "A";
			if (record.percentile <= 25) return "B";
			if (record.meanGrade >= 5) return "C";
			return "D";
		},

		rankAltText(record){
			return `In the top ${record.percentile}% of students.`;
		},

    },

    computed: {},

    template: `

<table class="table table-striped projects">
    <thead>
        <tr>
            <th style="width: 1%">#</th>
            <th>Student</th>
            <th v-if="showRank" style="width: 5%" >Rank</th>
            <th v-if="showDegrees" >Degree(s)</th>
            <th v-if="showStats" >Average Grade</th>
            <th v-if="showActions" style="width: 20%">Actions</th>
        </tr>
    </thead>

    <tbody v-if="students.length > 0">
        <tr  v-for="(student, i) in students">
            <td>{{i+1}}</td>
            <td valign="middle">
                <span>
                    <img v-if="showImage" :src="student.profile.image" class="avatar" style="margin-right:8px">
					<a :href="student.recordSet[0].predDropout ? 'student-drop.html' : 'student.html'">
                    {{student.profile.fullName}}
					</a>
                </span>
            </td>

			<td v-if="showRank" class="text-center" style="vertical-align:middle">
				<div v-for="(record,i) in student.recordSet" :style="{'margin-top': (i>0?'5px':'0px')}">
					<span style="font-size:2rem" :title="rankAltText(record)">{{ getRecordRank(record) }}</span>
				</div>
			</td>

            <td v-if="showDegrees">
                <div v-for="record in student.recordSet">
                {{record.degree.name}}
                <br>
                <small>Started on {{record.yearStarted}}</small>
                </div>
            </td>

            <td v-if="showStats" class="project_progress">
                <!--<small>Average Grade</small>-->
                <div v-for="record in student.recordSet">
                    <div class="progress progress_sm">
                        <div :class="getBGClasses(record.meanGrade)"
                            role="progressbar"
                            :style="'width:' + (record.meanGrade*10) + '%'">
                        </div>
                    </div>
                    <small>{{ record.degree.name }} {{ record.meanGrade}}</small>
                </div>
            </td>

            <td v-if="showActions">
                <a href="#" class="btn btn-primary btn-xs">
                <i class="fa fa-folder"></i> View </a>
                <a href="#" class="btn btn-success btn-xs">
                    <i class="fa fa-commenting"></i> Message
                </a>
            </td>

        </tr>
    </tbody>


    <tbody v-else>
        <tr>
            <td colspan="5">
                <h2 style="text-align:center">No students to show</h2>
            </td>
        </tr>
    </tbody>

</table>

   `,


});
