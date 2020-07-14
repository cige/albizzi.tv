var browser

function initBrowser(el, clips){
    browser = new Vue({
        delimiters: ['[[', ']]'],
        el,
        data: {
            clips,
            filteredClips: clips,
            filterinterpreter: null,
            filtercomposer: null
        },
        computed: {
            interpreters: function(){
                return uniqValuesOf('interpreter')(this.clips).sort().map(interpreter => {
                    return {
                        name: interpreter,
                        nb: this.filteredClips.reduce((acc, c) => c['interpreter'] == interpreter ? acc + 1 : acc, 0),
                        active: this.filterinterpreter == interpreter
                    }
                })
            },
            composers: function(){
                return uniqValuesOf('composer')(this.clips).sort().map(composer => {
                    return {
                        name: composer,
                        nb: this.filteredClips.reduce((acc, c) => c['composer'] == composer ? acc + 1 : acc, 0),
                        active: this.filtercomposer == composer
                    }
                })
            },
            isFiltered: function(){
                return this.filtercomposer !== null || this.filterinterpreter !== null
            }
        },
        methods: {
            filterWith: function(field,value){
                this['filter' + field] = value
                this.filteredClips = this.clips.filter(c => (!this.filterinterpreter || c['interpreter'] == this.filterinterpreter) 
                    && (!this.filtercomposer || c['composer'] == this.filtercomposer))
            },
            reset: function(){
                this.filtercomposer = null
                this.filterinterpreter = null
                this.filteredClips = this.clips
            }
        }
      });
}

const uniqValuesOf = field => clips => {
    return (clips || []).reduce((values, current) => {
        const v = current[field]
        if(!values.includes(v))
            values.push(v)
        return values
    }, [])
}