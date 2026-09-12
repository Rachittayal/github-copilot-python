# NOTE: Copilot's initial pytest setup caused
# "ModuleNotFoundError: No module named 'app'" because tests/ and app.py
# live in different directories with no path configuration. I rejected
# that incomplete suggestion and asked Copilot to fix it properly by
# adding this path-extension logic instead of using a hacky relative
# import inside the test file itself.
# See Screenshots/copilot_pytest_setup_prompt.png for the follow-up fix.
import sys
from pathlib import Path


STARTER_DIR = Path(__file__).resolve().parents[1]
if str(STARTER_DIR) not in sys.path:
    sys.path.insert(0, str(STARTER_DIR))