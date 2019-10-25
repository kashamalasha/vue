var app = new Vue ({
	el: '#app',
	data: {
		product: 'Test',
		count: 0
	},
	methods: {
		pushMe() {
			this.count += 1;
		},
        testHoover() {
            this.product = "Get away!";
        }
	}
})