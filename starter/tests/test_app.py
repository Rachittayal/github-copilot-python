from app import app


def test_home_route_returns_ok():
    client = app.test_client()

    response = client.get('/')

    assert response.status_code == 200


def test_new_route_defaults_to_medium_difficulty():
    client = app.test_client()

    response = client.get('/new')

    assert response.status_code == 200
    assert response.get_json()['difficulty'] == 'medium'


def test_new_route_returns_requested_difficulty():
    client = app.test_client()

    response = client.get('/new?difficulty=easy')

    assert response.status_code == 200
    assert response.get_json()['difficulty'] == 'easy'


def test_new_route_rejects_invalid_difficulty():
    client = app.test_client()

    response = client.get('/new?difficulty=impossible')

    assert response.status_code == 400
    assert "Invalid difficulty 'impossible'" in response.get_json()['error']