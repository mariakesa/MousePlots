from dotenv import load_dotenv
import numpy as np
import matplotlib.pyplot as plt
from pathlib import Path
from allensdk.core.brain_observatory_cache import BrainObservatoryCache
import os
import pickle
import json

load_dotenv()

allen_cache_path = os.environ.get('HGMS_ALLEN_CACHE_PATH')
boc = BrainObservatoryCache(manifest_file=str(Path(allen_cache_path) / Path('brain_observatory_manifest.json')))

'''
[{'id': 506278598,
  'imaging_depth': 275,
  'targeted_structure': 'VISpm',
  'cre_line': 'Rorb-IRES2-Cre',
  'reporter_line': 'Ai93(TITL-GCaMP6f)',
  'acquisition_age_days': 88,
  'experiment_container_id': 511511001,
  'session_type': 'three_session_B',
  'donor_name': '228786',
  'specimen_name': 'Rorb-IRES2-Cre;Camk2a-tTA;Ai93-228786',
  'fail_eye_tracking': True},
 {'id': 505811062,
  'imaging_depth': 275,
  'targeted_structure': 'VISpm',
  'cre_line': 'Rorb-IRES2-Cre',
  'reporter_line': 'Ai93(TITL-GCaMP6f)',
  'acquisition_age_days': 87,
  'experiment_container_id': 511511001,
  'session_type': 'three_session_C',
  'donor_name': '228786',
  'specimen_name': 'Rorb-IRES2-Cre;Camk2a-tTA;Ai93-228786',
  'fail_eye_tracking': True},
 {'id': 506540916,
  'imaging_depth': 275,
  'targeted_structure': 'VISpm',
  'cre_line': 'Rorb-IRES2-Cre',
  'reporter_line': 'Ai93(TITL-GCaMP6f)',
  'acquisition_age_days': 89,
  'experiment_container_id': 511511001,
  'session_type': 'three_session_A',
  'donor_name': '228786',
  'specimen_name': 'Rorb-IRES2-Cre;Camk2a-tTA;Ai93-228786',
  'fail_eye_tracking': True}]
'''
#cell_exp = boc.get_ophys_experiments(experiment_container_ids=[511511001])
data_set_regression = boc.get_ophys_experiment_data(506278598)
data_set_events= boc.get_ophys_experiment_events(506278598)
stim_table=data_set_regression.get_stimulus_table('natural_movie_one')

cells = data_set_regression.get_cell_specimen_ids()
cell2ix={cell:ix for ix, cell in enumerate(cells)}
ix2cell={ix:cell for ix, cell in enumerate(cells)}

#517473760
print(ix2cell[6])

ts=stim_table['start']
ds=data_set_events[6,ts]
print(ds.shape)
nonzero=ds.nonzero()[0]
print(nonzero)
zero=np.where(ds == 0)[0]
print(zero)

# Ensure the values are in a list and convert to native Python types for JSON serialization
data = {'events': len(nonzero), 'zero': len(zero)}

#plt.bar([0,1],[len(zero), len(nonzero)])
#plt.show()
plt.pie([len(zero), len(nonzero)])
plt.show()

# Specify the path where you want to save the JSON file
json_file_path = '/home/maria/MousePlots/plot_data/pie.json'

# Write the data to a JSON file
with open(json_file_path, 'w') as json_file:
    json.dump(data, json_file)