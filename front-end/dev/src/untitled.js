renderThreat(instance) {
    return (
      <Thumbnail src={instance.image}>
        <p><b>Severity: &nbsp; </b>{ instance.severity }</p>
        <p><b>Timing: &nbsp; </b>{ instance.timing }</p>
        <p><b>Animals: &nbsp; </b></p>
          <ul>
            {
              instance.assoc_animals.map(function(animal, i){
                  return (
                    <a key={"ah"+i} onClick={() => { this.changeURL('animal', animal) }} >
                      <li key={"h"+i}>{ animal }</li>
                    </a>
                  )
              }.bind(this))
            }
          </ul>
          
          <p><b>Habitats:</b></p>
            <ul>
              {
                instance.assoc_habitats.map(function(habitat, i){
                    return (
                      <a key={"ah"+i} onClick={() => { this.changeURL('habitat', habitat) }} >
                        <li key={"h"+i}>{ habitat }</li>
                      </a>
                    )
                }.bind(this))
              }
            </ul>

      </Thumbnail>
    );
  };