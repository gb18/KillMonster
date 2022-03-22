new Vue({
    el: '#app',
    data: {
        widthPlayer: 100,
        widthMonster: 100,
        endGame: true,
        logs: []
    },
    methods: {
        generateRandom: function() {
            return (Math.floor(Math.random() * 10) + 1);
        },
        startGame: function() {
            this.widthPlayer = 100;
            this.widthMonster = 100;
            this.endGame = false;
            this.logs = [];
        },
        attack: function() {
            if(!this.endGame) {
                var damagePlayer = this.generateRandom();
                var damageMonster = this.generateRandom();
                this.widthPlayer -= damageMonster;
                this.widthMonster -= damagePlayer;
                this.logs.unshift({
                    player: 'Player hits Monster for ' + damagePlayer,
                    monster: 'Monster hits Player for ' + damageMonster
                });
            } else {
                alert('Start new game for continue...');
            }
        },
        specialAttack:function() {
            if(!this.endGame) {
                var damagePlayer = this.generateRandom();
                var damageMonster = this.generateRandom();
                this.widthMonster -= (damagePlayer * 2);
                this.widthPlayer -= damageMonster;
                this.logs.unshift({
                    player: 'Player hits Monster for ' + damagePlayer * 2,
                    monster: 'Monster hits Player for ' + damageMonster
                });
            } else {
                alert('Start new game for continue...');
            }
        },
        heal: function() {
            if(!this.endGame) {
                var healPlayer = this.generateRandom();
                var damageMonster = this.generateRandom();
                
                if(this.widthPlayer + healPlayer <= 100) {
                    this.widthPlayer += healPlayer;
                    this.widthPlayer -= damageMonster;
                    this.logs.unshift({
                        player: 'Player heals for ' + healPlayer,
                        monster: 'Monster hits Player for ' + damageMonster
                    });
                } else {
                    alert('Full Health');
                }
            } else {
                alert('Start new game for continue...');
            }
        },
        giveUp: function() {
            var r = confirm("Give up?");
            if(r == true) {
                this.startGame();
                this.endGame = true;
            }
        }
    },
    computed: {
        healthPlayer: function() {
            return {
                width: this.widthPlayer + '%'
            }
        },
        healthMonster: function() {
            return {
                width: this.widthMonster + '%'
            }
        }
    },
    watch: {
        widthMonster: function() {
            if(this.widthMonster <= 0) {
                if(this.widthMonster <= 0 && this.widthPlayer > 0) {
                    alert('Player WINS');
                    this.endGame = true;
                } else {
                    alert('TIE');
                    this.endGame = true;
                }
            };
        },
        widthPlayer: function() {
            if(this.widthPlayer <= 0) {
                if(this.widthPlayer <= 0 && this.widthMonster > 0) {
                    alert('Monster WINS');
                    this.endGame = true;
                } else {
                    alert('TIE');
                    this.endGame = true;
                }
            }
        }
    }
})